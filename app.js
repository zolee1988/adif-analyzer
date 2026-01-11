// Egyszerű ADIF parser: minden <eor> egy QSO
function parseAdif(text) {
  const records = text.split(/<eor>/i).map(r => r.trim()).filter(Boolean);
  return records.map(parseAdifRecord).filter(q => q.call);
}

// Egy rekord feldarabolása mezőkre
function parseAdifRecord(block) {
  const qso = {};
  const regex = /<([^:>]+)(?::(\d+))?(?:[^>]*)>([^<]*)/gi;
  let match;
  while ((match = regex.exec(block)) !== null) {
    const field = match[1].toLowerCase();
    const value = match[3].trim();
    qso[field] = value;
  }
  return qso;
}

// DXCC -> kontinens (magyar)
function dxccToContinent(dxcc) {
  const n = parseInt(dxcc, 10);
  if (isNaN(n)) return 'Ismeretlen';

  if ([291, 1, 6, 67, 94, 50].includes(n)) return 'Észak-Amerika';
  if ([108, 116, 88, 90].includes(n)) return 'Dél-Amerika';
  if ([239, 248, 263, 230, 281, 223, 294, 272, 296, 206, 501].includes(n)) return 'Európa';
  if ([327, 339, 324, 299, 375, 304, 305].includes(n)) return 'Ázsia';
  if ([462].includes(n)) return 'Afrika';
  if ([375, 327].includes(n)) return 'Óceánia';

  return 'Ismeretlen';
}

// Maidenhead lokátor -> lat/lon
function maidenheadToLatLon(grid) {
  if (!grid || grid.length < 4) return null;

  grid = grid.toUpperCase();
  const A = 'A'.charCodeAt(0);

  const lon = (grid.charCodeAt(0) - A) * 20 - 180 +
              (grid.charCodeAt(2) - 48) * 2 +
              (grid.length >= 6 ? (grid.charCodeAt(4) - A) / 12 : 0) +
              (grid.length >= 8 ? (grid.charCodeAt(6) - 48) / 120 : 0);

  const lat = (grid.charCodeAt(1) - A) * 10 - 90 +
              (grid.charCodeAt(3) - 48) * 1 +
              (grid.length >= 6 ? (grid.charCodeAt(5) - A) / 24 : 0) +
              (grid.length >= 8 ? (grid.charCodeAt(7) - 48) / 240 : 0);

  return { lat, lon };
}

// ADIF lat/lon -> decimális
function adifCoordToDecimal(str) {
  const m = /^([NSWE])(\d{3})\s+(\d{2}\.\d+)$/.exec(str.trim());
  if (!m) return null;
  const dir = m[1];
  const deg = parseInt(m[2], 10);
  const min = parseFloat(m[3]);
  let val = deg + min / 60;
  if (dir === 'S' || dir === 'W') val = -val;
  return val;
}

// Sáv normalizálás (IARU R1 szerint, frekvencia MHz-ben)
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

// Statisztika számítás
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

      let cont = dxccToContinent(dxcc);
      if (!cont) cont = 'Ismeretlen';

      continentCounts[cont] = (continentCounts[cont] || 0) + 1;
    }

    const mode = normalizeMode(qso);
    modeCounts[mode] = (modeCounts[mode] || 0) + 1;

    const band = normalizeBand(qso);
    bandCounts[band] = (bandCounts[band] || 0) + 1;

    const d = parseFloat(qso.distance);
    if (!isNaN(d) && d > 0) {
      if (d < minDistance) { minDistance = d; minQso = qso; }
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
    minDistance,
    maxDistance,
    minQso,
    maxQso
  };
}

// DOM elemek
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

// Fájl beolvasása
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

function readFile(file) {
  const reader = new FileReader();

  reader.onload = e => {
    const text = e.target.result;
    statusEl.textContent = `Fájl beolvasva: ${file.name}, feldolgozás…`;

    const qsos = parseAdif(text);

    // --- ADIF VALIDÁCIÓ ---
    if (qsos.length === 0) {
      statusEl.innerHTML = `
        <span style="color:red; font-weight:bold;">
          A fájl nem tűnik érvényes ADIF formátumnak.
        </span><br>
        Kérlek tölts fel egy .adi vagy .adif naplófájlt.
      `;
      return; // fontos: ne fusson tovább
    }
    // -----------------------

    const stats = computeStats(qsos);
    renderStats(stats);
    renderContinentTable(stats);
    renderCharts(stats);
    renderMap(qsos);

    statusEl.textContent = `Kész: ${stats.totalQso} QSO feldolgozva.`;
  };

  reader.readAsText(file);
}


// Statisztika kiírása
function renderStats(stats) {
  totalQsoEl.textContent = stats.totalQso;
  totalDxccEl.textContent = stats.totalDxcc;

  if (stats.minQso)
    minDistanceEl.textContent = `${stats.minDistance.toFixed(0)} km – ${stats.minQso.call} (${stats.minQso.country})`;
  else minDistanceEl.textContent = 'N/A';

  if (stats.maxQso)
    maxDistanceEl.textContent = `${stats.maxDistance.toFixed(0)} km – ${stats.maxQso.call} (${stats.maxQso.country})`;
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

// Kontinens táblázat + összesítés
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

  const total = sorted.reduce((sum, [, c]) => sum + c, 0);
  const unique = sorted.length;
  const top = sorted[0];

  continentSummaryEl.innerHTML = `
    <p><strong>Összes QSO:</strong> ${total}</p>
    <p><strong>Legnépszerűbb kontinens:</strong> ${top[0]} (${top[1]} QSO)</p>
  `;
}

// Módok táblázat
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

// Sávok táblázat
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

// Chartok
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

  // Mode chart (egységes oszlopdiagram)
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

  // Band chart (egységes oszlopdiagram)
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

// Térkép renderelés
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
    let lat = null;
    let lon = null;

    if (qso.lat && qso.lon) {
      lat = adifCoordToDecimal(qso.lat);
      lon = adifCoordToDecimal(qso.lon);
    }

    if ((!lat || !lon) && qso.gridsquare) {
      const pos = maidenheadToLatLon(qso.gridsquare);
      if (pos) {
        lat = pos.lat;
        lon = pos.lon;
      }
    }

    if (!lat || !lon) return;

    const call = qso.call || '';
    const url = `https://www.qrz.com/db/${call}`;

    L.marker([lat, lon]).addTo(map)
  .bindPopup(`
    <a href="${url}" target="_blank">${call}</a><br>
    ${qso.country || ''}<br>
    ${qso.distance ? qso.distance + ' km' : ''}<br>
    Grid: ${qso.gridsquare || 'N/A'}<br>
    Date: ${qso.qso_date || 'N/A'}<br>
    Mode: ${qso.mode || 'N/A'}<br>
    Band: ${normalizeBand(qso)}
  `);

  });
}
