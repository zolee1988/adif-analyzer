# 📡 ADIF Log Analyzer  
Webes, kliensoldali ADIF elemző rádióamatőröknek.

👉 **Használd itt:**  
https://zolee1988.github.io/adif-analyzer/

Nincs telepítés, nincs regisztráció, nincs adatküldés — csak húzd rá az ADIF fájlodat, és már kész is a statisztika.

---

## ✨ Funkciók

### 📊 Statisztikák
- Összes QSO száma  
- DXCC darabszám  
- Top 10 DXCC lista  
- Üzemmód szerinti bontás  
- Sáv szerinti bontás  
- Kontinens statisztika (oszlopdiagram)  
- Legrövidebb és leghosszabb QSO távolság  

### 🗺️ Térképes megjelenítés
- Minden QSO markerrel jelenik meg  
- Ha az ADIF tartalmaz **LAT/LON** mezőt → azt használja  
- Ha nincs, de van **GRIDSQUARE** → automatikusan számolja a koordinátát  
- Marker popup tartalmazza:
  - hívójel (kattintható QRZ.com link)
  - ország
  - távolság (ha szerepel a logban)

### 🔐 Teljesen kliensoldali működés
- A fájl **nem kerül feltöltésre**  
- Minden feldolgozás a böngészőben történik  
- Gyors, biztonságos, offline‑barát

---

## 🚀 Használat

1. Nyisd meg az oldalt:  
   **https://zolee1988.github.io/adif-analyzer/**
2. Húzd rá az ADIF fájlodat, vagy válaszd ki a gombbal  
3. A statisztikák, diagramok és térkép automatikusan megjelennek  

Támogatott formátum: **.adi / .adif**

---

## 🧠 Technikai háttér

- **JavaScript** alapú, backend nélkül  
- **Chart.js** a diagramokhoz (MIT)  
- **Leaflet** a térképhez (BSD‑2)  
- **OpenStreetMap** csempék  
- ADIF parser saját megvalósítással  
- Maidenhead lokátor → koordináta átszámítás  
- DXCC → kontinens hozzárendelés egyszerűsített táblával  

---

## 🔒 Licence

A projekt **GPL‑3.0** licenc alatt áll.

Felhasznált könyvtárak:
- Chart.js – MIT  
- Leaflet – BSD‑2  
- OpenStreetMap – ODbL  

A licencek szövege a `THIRD_PARTY_LICENSES` fájlban található.

---

## Ha szeretnéd támogatni a projektet és a munkámat, PayPal-on tudsz támogatást küldeni:

[![Donate](https://img.shields.io/badge/PayPal-Donate-blue.svg)](https://www.paypal.me/zolikakiss)

---

## 📡 73 de HG4ZKZ
