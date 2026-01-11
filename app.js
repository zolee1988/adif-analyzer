// =========================
// 1. ADIF PARSER
// =========================

function parseAdif(text) {
  const records = text.split(/<eor>/i).map(r => r.trim()).filter(Boolean);
  return records.map(parseAdifRecord).filter(q => q.call);
}

function parseAdifRecord(block) {
  const qso = {};
  const regex = /<([^:>]+)(?::(\d+))?(?::([A-Z]))?[^>]*>([^<]*)/gi;
  let match;
  while ((match = regex.exec(block)) !== null) {
    const field = match[1].toLowerCase();
    const value = match[4].trim();
    qso[field] = value;
  }
  return qso;
}

// =========================
// 2. KOORDINÁTA FÜGGVÉNYEK
// =========================

function maidenheadToLatLon(grid) {
  if (!grid || grid.length < 4) return null;

  grid = grid.toUpperCase();
  const A = 'A'.charCodeAt(0);

  let lon = (grid.charCodeAt(0) - A) * 20 - 180;
  let lat = (grid.charCodeAt(1) - A) * 10 - 90;

  lon += parseInt(grid[2]) * 2;
  lat += parseInt(grid[3]) * 1;

  if (grid.length >= 6) {
    lon += (grid.charCodeAt(4) - A) / 12;
    lat += (grid.charCodeAt(5) - A) / 24;
  }

  if (grid.length >= 8) {
    lon += parseInt(grid[6]) / 120;
    lat += parseInt(grid[7]) / 240;
  }

  // KÖZÉPPONT hozzáadása
  // (fél cella minden szinten)
  let cellLon = 2;
  let cellLat = 1;

  if (grid.length >= 6) {
    cellLon = 1 / 12;
    cellLat = 1 / 24;
  }

  if (grid.length >= 8) {
    cellLon = 1 / 120;
    cellLat = 1 / 240;
  }

  lon += cellLon / 2;
  lat += cellLat / 2;

  return { lat, lon };
}


function latLonToMaidenhead(lat, lon) {
  lon += 180;
  lat += 90;

  const A = 'A'.charCodeAt(0);

  const fieldLon = Math.floor(lon / 20);
  const fieldLat = Math.floor(lat / 10);

  const squareLon = Math.floor((lon % 20) / 2);
  const squareLat = Math.floor(lat % 10);

  const subsquareLon = Math.floor((lon % 2) * 12);
  const subsquareLat = Math.floor((lat % 1) * 24);

  return String.fromCharCode(A + fieldLon)
       + String.fromCharCode(A + fieldLat)
       + squareLon.toString()
       + squareLat.toString()
       + String.fromCharCode(A + subsquareLon)
       + String.fromCharCode(A + subsquareLat);
}

function adifCoordToDecimal(str) {
  const m = /^([NSWE])0?(\d{2,3})\s+(\d{2}(?:\.\d+)?)$/.exec(str.trim());
  if (!m) return null;
  const dir = m[1];
  const deg = parseInt(m[2], 10);
  const min = parseFloat(m[3]);
  let val = deg + min / 60;
  if (dir === 'S' || dir === 'W') val = -val;
  return val;
}

// =========================
// 3. SÁV / MÓD NORMALIZÁLÁS
// =========================

function normalizeBand(qso) {
  if (qso.band) return qso.band.toLowerCase();
  if (!qso.freq) return 'unk';

  const f = parseFloat(qso.freq);

  // HF
  if (f >= 0.1357 && f <= 0.1378) return '2200m';
  if (f >= 0.472 && f <= 0.479) return '630m';
  if (f >= 1.810 && f <= 2.000) return '160m';
  if (f >= 3.500 && f <= 3.800) return '80m';
  if (f >= 5.3515 && f <= 5.3665) return '60m';
  if (f >= 7.000 && f <= 7.200) return '40m';
  if (f >= 10.100 && f <= 10.150) return '30m';
  if (f >= 14.000 && f <= 14.350) return '20m';
  if (f >= 18.068 && f <= 18.168) return '17m';
  if (f >= 21.000 && f <= 21.450) return '15m';
  if (f >= 24.890 && f <= 24.990) return '12m';
  if (f >= 28.000 && f <= 29.700) return '10m';

  // VHF
  if (f >= 50 && f <= 54) return '6m';
  if (f >= 70 && f <= 70.5) return '4m';
  if (f >= 144 && f <= 146) return '2m';

  // UHF
  if (f >= 430 && f <= 440) return '70cm';
  if (f >= 1240 && f <= 1300) return '23cm';

  // SHF
  if (f >= 2300 && f <= 2450) return '13cm';
  if (f >= 3400 && f <= 3475) return '9cm';
  if (f >= 5650 && f <= 5925) return '6cm';

  // 3 cm
  if (f >= 10000 && f <= 10500) return '3cm';

  // µW
  if (f >= 24000 && f <= 24250) return '1.2cm';
  if (f >= 47000 && f <= 47200) return '6mm';
  if (f >= 75500 && f <= 81500) return '4mm';
  if (f >= 122250 && f <= 123000) return '2.5mm';
  if (f >= 134000 && f <= 141000) return '2mm';
  if (f >= 241000 && f <= 250000) return '1mm';

  return 'unk';
}

function normalizeMode(qso) {
  return (qso.mode || 'UNK').toUpperCase();
}

// =========================
// 4. SAJÁT QTH BETÖLTÉSE (index.html mezőkből)
// =========================

let myCall = null;
let myGrid = null;
let myLat = null;
let myLon = null;

function loadUserQth() {
  myCall = document.getElementById("myCall").value.trim();
  myGrid = document.getElementById("myGrid").value.trim();

  if (myGrid) {
    const pos = maidenheadToLatLon(myGrid);
    if (pos) {
      myLat = pos.lat;
      myLon = pos.lon;
    }
  }
}

// =========================
// 5. PREFIX ALAPÚ QSO KIEGÉSZÍTÉS (cty.json alapján)
// =========================

function enhanceQso(qso) {
  const info = lookupCallsign(qso.call || "");

  if (info) {
    qso.country = info.country;
    qso.dxcc = info.dxcc;
    qso.continent = info.continent;

    // CTY lat/lon → decimális
    if (info.lat != null && info.lon != null) {
      qso.lat_dec = info.lat;
      qso.lon_dec = info.lon;
    }
  }

  return qso;
}

// =========================
// 6. TÁVOLSÁG SZÁMÍTÁS
// =========================

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// =========================
// 7. STATISZTIKA SZÁMÍTÁS
// =========================

function computeStats(qsos) {
  const dxccCounts = {};
  const countryByDxcc = {};
  const continentCounts = {};
  const modeCounts = {};
  const bandCounts = {};

  let minDistance = Infinity;
  let maxDistance = 0;
  let minQso = null;
  let maxQso = null;

  qsos.forEach(qso => {
    const dxcc = qso.dxcc || null;

    if (dxcc) {
      dxccCounts[dxcc] = (dxccCounts[dxcc] || 0) + 1;

      if (qso.country) {
        countryByDxcc[dxcc] = qso.country;
      }

      // elsődlegesen a cty.json kontinens mezője
      let cont = qso.continent || dxccToContinent(dxcc) || 'Ismeretlen';
      continentCounts[cont] = (continentCounts[cont] || 0) + 1;
    }

    // mód
    const mode = normalizeMode(qso);
    modeCounts[mode] = (modeCounts[mode] || 0) + 1;

    // sáv
    const band = normalizeBand(qso);
    bandCounts[band] = (bandCounts[band] || 0) + 1;

    // távolság saját QTH-hoz
    if (myLat != null && myLon != null && qso.lat_dec != null && qso.lon_dec != null) {
      const d = distanceKm(myLat, myLon, qso.lat_dec, qso.lon_dec);
      qso.distance = d;

      if (d > 0 && d < minDistance) { minDistance = d; minQso = qso; }
      if (d > maxDistance) { maxDistance = d; maxQso = qso; }
    }
  });

  const dxccTop = Object.entries(dxccCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([dxcc, count]) => ({
      dxcc,
      count,
      country: countryByDxcc[dxcc] || 'Ismeretlen'
    }));

  return {
    totalQso: qsos.length,
    totalDxcc: Object.keys(dxccCounts).length,
    dxccTop,
    continentCounts,
    modeCounts,
    bandCounts,
    minDistance: isFinite(minDistance) ? minDistance : 0,
    maxDistance: isFinite(maxDistance) ? maxDistance : 0,
    minQso,
    maxQso
  };
}

// =========================
// 8. DOM ELEMEK
// =========================

const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');
const statusEl = document.getElementById('status');

const totalQsoEl = document.getElementById('totalQso');
const totalDxccEl = document.getElementById('totalDxcc');
const minDistanceEl = document.getElementById('minDistance');
const maxDistanceEl = document.getElementById('maxDistance');

const dxccTableBody = document.querySelector('#dxccTable tbody');
const continentTableBody = document.querySelector('#continentTable tbody');
const continentSummaryEl = document.getElementById('continentSummary');

let dxccChart, continentChart, modeChart, bandChart;
let map;

// =========================
// 9. TÁBLÁZATOK RENDERELÉSE
// =========================

function renderStats(stats) {
  totalQsoEl.textContent = stats.totalQso;
  totalDxccEl.textContent = stats.totalDxcc;

  if (stats.minQso)
    minDistanceEl.textContent = `${stats.minDistance.toFixed(0)} km – ${stats.minQso.call} (${stats.minQso.country || ''})`;
  else minDistanceEl.textContent = 'N/A';

  if (stats.maxQso)
    maxDistanceEl.textContent = `${stats.maxDistance.toFixed(0)} km – ${stats.maxQso.call} (${stats.maxQso.country || ''})`;
  else maxDistanceEl.textContent = 'N/A';

  dxccTableBody.innerHTML = '';
  stats.dxccTop.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${item.dxcc}</td>
      <td>${item.country}</td>
      <td>${item.count}</td>
    `;
    dxccTableBody.appendChild(tr);
  });
}

function renderContinentTable(stats) {
  continentTableBody.innerHTML = '';

  const sorted = Object.entries(stats.continentCounts)
    .sort((a, b) => b[1] - a[1]);

  sorted.forEach(([continent, count], idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${continent}</td>
      <td>${count}</td>
    `;
    continentTableBody.appendChild(tr);
  });

  if (sorted.length === 0) {
    continentSummaryEl.innerHTML = `<p>Nincs elérhető kontinens statisztika.</p>`;
    return;
  }

  const total = sorted.reduce((sum, [, c]) => sum + c, 0);
  const top = sorted[0];

  continentSummaryEl.innerHTML = `
    <p><strong>Összes QSO:</strong> ${total}</p>
    <p><strong>Legnépszerűbb kontinens:</strong> ${top[0]} (${top[1]} QSO)</p>
  `;
}

function renderModeTable(stats) {
  const tbody = document.querySelector('#modeTable tbody');
  tbody.innerHTML = '';

  const sorted = Object.entries(stats.modeCounts)
    .sort((a, b) => b[1] - a[1]);

  sorted.forEach(([mode, count], idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${mode}</td>
      <td>${count}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderBandTable(stats) {
  const tbody = document.querySelector('#bandTable tbody');
  tbody.innerHTML = '';

  const sorted = Object.entries(stats.bandCounts)
    .sort((a, b) => b[1] - a[1]);

  sorted.forEach(([band, count], idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${band}</td>
      <td>${count}</td>
    `;
    tbody.appendChild(tr);
  });
}

// =========================
// 10. FÁJL BEOLVASÁSA
// =========================

fileInput.addEventListener('change', handleFileSelect);

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) readFile(file);
}

// Drag & drop
dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) readFile(file);
});

// Fájl feldolgozása + CTY betöltés + saját QTH betöltése
async function readFile(file) {
  await loadCty();      // cty.json betöltése
  loadUserQth();        // saját hívójel + grid betöltése

  const reader = new FileReader();

  reader.onload = e => {
    const text = e.target.result;
    statusEl.textContent = `Fájl beolvasva: ${file.name}, feldolgozás…`;

    let qsos = parseAdif(text);
    qsos = qsos.map(enhanceQso);

    if (qsos.length === 0) {
      statusEl.innerHTML = `
        <span style="color:red; font-weight:bold;">
          A fájl nem tűnik érvényes ADIF formátumnak.
        </span><br>
        Kérlek tölts fel egy .adi vagy .adif naplófájlt.
      `;
      return;
    }

    const stats = computeStats(qsos);
    renderStats(stats);
    renderContinentTable(stats);
    renderCharts(stats);
    renderMap(qsos);

    statusEl.textContent = `Kész: ${stats.totalQso} QSO feldolgozva.`;
  };

  reader.readAsText(file);
}

// =========================
// 11. CHARTOK
// =========================

function renderCharts(stats) {
  // DXCC chart
  const dxccLabels = stats.dxccTop.map(d => `${d.dxcc} (${d.country})`);
  const dxccData = stats.dxccTop.map(d => d.count);

  if (dxccChart) dxccChart.destroy();
  dxccChart = new Chart(document.getElementById('dxccChart'), {
    type: 'bar',
    data: {
      labels: dxccLabels,
      datasets: [{ data: dxccData, backgroundColor: '#4f6bff' }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

  // Continent chart
  const contLabels = Object.keys(stats.continentCounts);
  const contData = contLabels.map(k => stats.continentCounts[k]);

  if (continentChart) continentChart.destroy();
  continentChart = new Chart(document.getElementById('continentChart'), {
    type: 'bar',
    data: {
      labels: contLabels,
      datasets: [{ data: contData, backgroundColor: '#4f6bff' }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

  // Mode chart
  if (modeChart) modeChart.destroy();
  modeChart = new Chart(document.getElementById('modeChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(stats.modeCounts),
      datasets: [{
        data: Object.values(stats.modeCounts),
        backgroundColor: '#4f6bff'
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

  // Band chart
  if (bandChart) bandChart.destroy();
  bandChart = new Chart(document.getElementById('bandChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(stats.bandCounts),
      datasets: [{
        data: Object.values(stats.bandCounts),
        backgroundColor: '#4f6bff'
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

  // Táblázatok frissítése
  renderModeTable(stats);
  renderBandTable(stats);
}

// =========================
// 12. TÉRKÉP
// =========================

function renderMap(qsos) {
  if (!map) {
    map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 10,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);
  }

  // Előző markerek törlése
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) map.removeLayer(layer);
  });

  qsos.forEach(qso => {
    const lat = qso.lat_dec;
    const lon = qso.lon_dec;

    // Ha nincs koordináta → nem rajzolunk markert
    if (typeof lat !== "number" || typeof lon !== "number") {
      console.warn("Hiányzó koordináta:", qso.call, lat, lon);
      return;
    }

    const call = qso.call || '';
    const url = `https://www.qrz.com/db/${call}`;

    L.marker([lat, lon]).addTo(map)
      .bindPopup(`
        <a href="${url}" target="_blank">${call}</a><br>
        ${qso.country || ''}<br>
        DXCC: ${qso.dxcc || ''}<br>
        Grid: ${qso.gridsquare || 'N/A'}<br>
        Date: ${qso.qso_date || 'N/A'}<br>
        Mode: ${qso.mode || 'N/A'}<br>
        Band: ${normalizeBand(qso)}
      `);
  });
}
