import json
import re
from pathlib import Path

# --- Fájlnevek ---
CTY_FILE = Path("cty.json")
COUNTRY_CENTROIDS_FILE = Path("country_centroids.js")
PREFIX_CENTROIDS_FILE = Path("prefix_centroids.js")


def load_cty(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def load_country_centroids(path: Path):
    """
    Nagyon egyszerű regex-szel kiszedi a:
      "Country Name": { lat: 12.345, lon: 67.890 }
    sorokat a JS fájlból.
    """
    text = path.read_text(encoding="utf-8")
    pattern = r'"([^"]+)"\s*:\s*\{\s*lat:\s*([-0-9\.]+)\s*,\s*lon:\s*([-0-9\.]+)\s*\}'
    centroids = {}
    for match in re.finditer(pattern, text):
        country = match.group(1)
        lat = float(match.group(2))
        lon = float(match.group(3))
        centroids[country] = {"lat": lat, "lon": lon}
    return centroids


def build_prefix_centroids(cty_data, country_centroids):
    """
    Logika:
    1) Végigmegy a CTY összes bejegyzésén.
    2) Prefix(ek) → centroid:
       - ha van country_centroids[country] → azt használja
       - különben, ha van Latitude/Longitude a CTY-ben → azt
       - különben: kihagyja (nem rak be prefix_centroidot)
    """
    prefix_centroids = {}

    for key, entry in cty_data.items():
        country = entry.get("Country")
        prefix_field = entry.get("Prefix")
        if not country or not prefix_field:
            continue

        # Prefix mezőben lehet több elem is vesszővel elválasztva, ezért split
        raw_prefixes = [p.strip() for p in prefix_field.split(",") if p.strip()]
        if not raw_prefixes:
            continue

        # Koordináták meghatározása
        lat = lon = None

        # 1) Próbáljuk a saját country_centroids alapján (ez a preferált, mert te már ezt tuningoltad)
        if country in country_centroids:
            lat = country_centroids[country]["lat"]
            lon = country_centroids[country]["lon"]
        else:
            # 2) Ha nincs a country_centroids-ben, próbáljuk a CTY lat/lon mezőjét
            # Figyelem: a CTY-ben a Longitude előjele lehet "furcsa", ezt te tudod finomhangolni.
            cty_lat = entry.get("Latitude")
            cty_lon = entry.get("Longitude")
            if cty_lat is not None and cty_lon is not None:
                lat = float(cty_lat)
                lon = float(cty_lon)

        # Ha így sincs értelmes koordináta, akkor ezt a bejegyzést kihagyjuk
        if lat is None or lon is None:
            continue

        # Minden prefixhez ugyanazt a centroidot rendeljük
        for p in raw_prefixes:
            # Ha már van ilyen prefix, nem írjuk felül (első találat győz)
            if p not in prefix_centroids:
                prefix_centroids[p] = {"lat": lat, "lon": lon}

    return prefix_centroids


def write_prefix_centroids_js(prefix_centroids, path: Path):
    """
    Kiírja JS formában:
    const PREFIX_CENTROIDS = {
      "DL": { lat: 51.0, lon: 10.0 },
      ...
    };
    """
    lines = []
    lines.append("const PREFIX_CENTROIDS = {")
    # ABC sorrend a szebb diff kedvéért
    for prefix in sorted(prefix_centroids.keys()):
        c = prefix_centroids[prefix]
        line = f'  "{prefix}": {{ lat: {c["lat"]:.6f}, lon: {c["lon"]:.6f} }},'
        lines.append(line)
    if len(lines) > 1:
        # Az utolsó sorról levesszük a vesszőt
        lines[-1] = lines[-1].rstrip(",")
    lines.append("};")
    lines.append("")  # záró soremelés

    path.write_text("\n".join(lines), encoding="utf-8")
    print(f"Kiírva: {path} ({len(prefix_centroids)} prefix)")


def main():
    print("CTY betöltése...")
    cty_data = load_cty(CTY_FILE)

    print("country_centroids.js betöltése...")
    country_centroids = load_country_centroids(COUNTRY_CENTROIDS_FILE)
    print(f"Ország centroidok: {len(country_centroids)} db")

    print("PREFIX_CENTROIDS építése...")
    prefix_centroids = build_prefix_centroids(cty_data, country_centroids)
    print(f"Prefix centroidok: {len(prefix_centroids)} db")

    print("prefix_centroids.js írása...")
    write_prefix_centroids_js(prefix_centroids, PREFIX_CENTROIDS_FILE)


if __name__ == "__main__":
    main()
