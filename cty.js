let CTY = null;

// JSON betöltése (egyszer)
async function loadCty() {
  if (!CTY) {
    CTY = await fetch("cty.json").then(r => r.json());
  }
  return CTY;
}

// Prefix alapú hívójel-keresés
function lookupCallsign(call) {
  if (!CTY) return null;

  call = call.toUpperCase();

  // Prefix matching: hosszútól rövidig
  for (let i = call.length; i > 0; i--) {
    const prefix = call.substring(0, i);
    if (CTY[prefix]) {
      const e = CTY[prefix];
      return {
        country: e.Country,
        dxcc: e.ADIF,
        continent: e.Continent,
        lat: e.Latitude,
        lon: e.Longitude
      };
    }
  }

  return null;
}
