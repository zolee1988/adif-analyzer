<p align="center">
  <a href="#magyar">🇭🇺 Magyar</a> |
  <a href="#english">🇬🇧 English</a>
</p>

<p align="center">
  <a href="#magyar">
    <img src="https://img.shields.io/badge/Language-HU-red?style=for-the-badge" />
  </a>
  <a href="#english">
    <img src="https://img.shields.io/badge/Language-EN-blue?style=for-the-badge" />
  </a>
</p>

---

# 🇭🇺 Magyar
<a name="magyar"></a>

# 📡 ADIF Log Analyzer  
Modern, kliensoldali ADIF elemző rádióamatőröknek – telepítés nélkül, azonnal használható.

👉 **Élő demó:**  
https://zolee1988.github.io/adif-analyzer/

Csak húzd rá az ADIF fájlodat, és már kész is a statisztika.  
Semmi adat nem kerül feltöltésre – minden a böngésződben történik.

---

## ✨ Funkciók

### 📊 Részletes statisztikák
- Összes QSO száma  
- DXCC entitások száma  
- **Top 10 DXCC** – táblázat + oszlopdiagram  
- **Kontinens statisztika** – táblázat + oszlopdiagram  
- **Üzemmódok (Mode)** – táblázat + oszlopdiagram  
- **Sávok (Band)** – táblázat + oszlopdiagram  
- Legrövidebb és leghosszabb QSO távolság  

---

## 🗺️ Térképes megjelenítés (Leaflet)
- Minden QSO markerrel jelenik meg  
- Ha az ADIF tartalmaz **LAT/LON** mezőt → azt használja  
- Ha nincs, de van **GRIDSQUARE** → automatikusan számolja a koordinátát  
- A marker popup tartalmazza:
  - hívójel (QRZ.com link)  
  - ország  
  - távolság  
  - **Grid**  
  - **Dátum**  
  - **Üzemmód**  
  - **Sáv** (IARU Region 1 alapján)

---

## 🔐 Teljesen kliensoldali működés
- A fájl **nem kerül feltöltésre**  
- Nincs szerver, nincs adatgyűjtés  
- Minden feldolgozás a böngészőben történik  

---

## 🚀 Használat

1. Nyisd meg az oldalt:  
   https://zolee1988.github.io/adif-analyzer/
2. Húzd rá az ADIF fájlodat  
3. A statisztikák és térkép automatikusan megjelennek  

Támogatott formátumok: **.adi**, **.adif**, **.txt**

---

## 🧠 Technikai háttér

- **JavaScript** – teljesen kliensoldali  
- **Chart.js** – egységes oszlopdiagramok  
- **Leaflet** – interaktív térkép  
- **OpenStreetMap** – térképcsempék  
- ADIF parser saját megvalósítással  
- Maidenhead lokátor → koordináta számítás  
- IARU Region 1 alapú sávfelismerés  

---

## 🔒 Licence

A projekt **GPL‑3.0** licenc alatt áll.

Felhasznált könyvtárak:
- Chart.js – MIT  
- Leaflet – BSD‑2  
- OpenStreetMap – ODbL  

---

## 💙 Támogatás

PayPal támogatás:  
https://www.paypal.me/zolikakiss

---

## 📡 73 de **HG4ZKZ**

---

# 🇬🇧 English
<a name="english"></a>

# 📡 ADIF Log Analyzer  
A modern, client‑side ADIF analyzer for amateur radio operators — no installation, no backend, instant results.

👉 **Live demo:**  
https://zolee1988.github.io/adif-analyzer/

Just drop your ADIF file onto the page and the statistics appear immediately.  
Your data never leaves your browser.

---

## ✨ Features

### 📊 Detailed statistics
- Total number of QSOs  
- Number of DXCC entities  
- **Top 10 DXCC** – table + bar chart  
- **Continent statistics** – table + bar chart  
- **Modes** – table + bar chart  
- **Bands** – table + bar chart  
- Shortest and longest QSO distance  

---

## 🗺️ Map display (Leaflet)
- Every QSO appears as a marker  
- If the ADIF contains **LAT/LON**, those coordinates are used  
- If not, but **GRIDSQUARE** is present → coordinates are calculated  
- Marker popup includes:
  - callsign (QRZ.com link)  
  - country  
  - distance  
  - **Grid**  
  - **Date**  
  - **Mode**  
  - **Band** (IARU Region 1 based)

---

## 🔐 Fully client‑side
- Your file is **never uploaded**  
- No server, no tracking  
- Everything runs locally in your browser  

---

## 🚀 Usage

1. Open the page:  
   https://zolee1988.github.io/adif-analyzer/
2. Drag & drop your ADIF file  
3. Statistics and map appear automatically  

Supported formats: **.adi**, **.adif**, **.txt**

---

## 🧠 Technical details

- **JavaScript** – fully client‑side  
- **Chart.js** – unified bar charts  
- **Leaflet** – interactive map  
- **OpenStreetMap** tiles  
- Custom ADIF parser  
- Maidenhead grid → coordinate conversion  
- IARU Region 1 band detection  

---

## 🔒 Licence

This project is licensed under **GPL‑3.0**.

Libraries used:
- Chart.js – MIT  
- Leaflet – BSD‑2  
- OpenStreetMap – ODbL  

---

## 💙 Support

PayPal donations:  
https://www.paypal.me/zolikakiss

---

## 📡 73 de **HG4ZKZ**
