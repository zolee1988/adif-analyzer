const COUNTRY_CENTROIDS = {
  "Hungary": { lat: 47.1625, lon: 19.5033 },
  "Austria": { lat: 47.5162, lon: 14.5501 },
  "Germany": { lat: 51.1657, lon: 10.4515 },
  "Slovak Republic": { lat: 48.6690, lon: 19.6990 },
  "Czech Republic": { lat: 49.8175, lon: 15.4730 },
  "Slovenia": { lat: 46.1512, lon: 14.9955 },
  "Croatia": { lat: 45.1000, lon: 15.2000 },
  "Serbia": { lat: 44.0165, lon: 21.0059 },
  "Romania": { lat: 45.9432, lon: 24.9668 },
  "Bulgaria": { lat: 42.7339, lon: 25.4858 },
  "Ukraine": { lat: 48.3794, lon: 31.1656 },
  "Poland": { lat: 51.9194, lon: 19.1451 },
  "Italy": { lat: 41.8719, lon: 12.5674 },
  "France": { lat: 46.2276, lon: 2.2137 },
  "Spain": { lat: 40.4637, lon: -3.7492 },
  "Portugal": { lat: 39.3999, lon: -8.2245 },
  "Switzerland": { lat: 46.8182, lon: 8.2275 },
  "Belgium": { lat: 50.5039, lon: 4.4699 },
  "Netherlands": { lat: 52.1326, lon: 5.2913 },
  "Denmark": { lat: 56.2639, lon: 9.5018 },
  "Norway": { lat: 60.4720, lon: 8.4689 },
  "Sweden": { lat: 60.1282, lon: 18.6435 },
  "Finland": { lat: 61.9241, lon: 25.7482 },
  "England": { lat: 52.3555, lon: -1.1743 },
  "Scotland": { lat: 56.4907, lon: -4.2026 },
  "Wales": { lat: 52.1307, lon: -3.7837 },
  "Northern Ireland": { lat: 54.7877, lon: -6.4923 },
  "Isle of Man": { lat: 54.2361, lon: -4.5481 },
  "Guernsey": { lat: 49.4554, lon: -2.5750 },
  "Jersey": { lat: 49.2144, lon: -2.1313 },
  "Ireland": { lat: 53.4129, lon: -8.2439 }
};

// --- Asia DXCC centroids ---
Object.assign(COUNTRY_CENTROIDS, {
  "Japan": { lat: 36.2048, lon: 138.2529 },
  "South Korea": { lat: 35.9078, lon: 127.7669 },
  "North Korea": { lat: 40.3399, lon: 127.5101 },
  "China": { lat: 35.8617, lon: 104.1954 },
  "Taiwan": { lat: 23.6978, lon: 120.9605 },
  "Hong Kong": { lat: 22.3193, lon: 114.1694 },
  "Macau": { lat: 22.1987, lon: 113.5439 },
  "Mongolia": { lat: 46.8625, lon: 103.8467 },
  "Philippines": { lat: 12.8797, lon: 121.7740 },
  "Vietnam": { lat: 14.0583, lon: 108.2772 },
  "Thailand": { lat: 15.8700, lon: 100.9925 },
  "Cambodia": { lat: 12.5657, lon: 104.9910 },
  "Laos": { lat: 19.8563, lon: 102.4955 },
  "Myanmar": { lat: 21.9162, lon: 95.9560 },
  "Malaysia": { lat: 4.2105, lon: 101.9758 },
  "Singapore": { lat: 1.3521, lon: 103.8198 },
  "Brunei": { lat: 4.5353, lon: 114.7277 },
  "Indonesia": { lat: -0.7893, lon: 113.9213 },
  "East Timor": { lat: -8.8742, lon: 125.7275 },
  "India": { lat: 20.5937, lon: 78.9629 },
  "Pakistan": { lat: 30.3753, lon: 69.3451 },
  "Bangladesh": { lat: 23.6850, lon: 90.3563 },
  "Sri Lanka": { lat: 7.8731, lon: 80.7718 },
  "Nepal": { lat: 28.3949, lon: 84.1240 },
  "Bhutan": { lat: 27.5142, lon: 90.4336 },
  "Maldives": { lat: 3.2028, lon: 73.2207 },
  "Kazakhstan": { lat: 48.0196, lon: 66.9237 },
  "Uzbekistan": { lat: 41.3775, lon: 64.5853 },
  "Turkmenistan": { lat: 38.9697, lon: 59.5563 },
  "Kyrgyzstan": { lat: 41.2044, lon: 74.7661 },
  "Tajikistan": { lat: 38.8610, lon: 71.2761 },
  "Afghanistan": { lat: 33.9391, lon: 67.7100 },
  "Iran": { lat: 32.4279, lon: 53.6880 },
  "Iraq": { lat: 33.2232, lon: 43.6793 },
  "Syria": { lat: 34.8021, lon: 38.9968 },
  "Jordan": { lat: 30.5852, lon: 36.2384 },
  "Lebanon": { lat: 33.8547, lon: 35.8623 },
  "Israel": { lat: 31.0461, lon: 34.8516 },
  "Saudi Arabia": { lat: 23.8859, lon: 45.0792 },
  "Kuwait": { lat: 29.3117, lon: 47.4818 },
  "Bahrain": { lat: 26.0667, lon: 50.5577 },
  "Qatar": { lat: 25.3548, lon: 51.1839 },
  "United Arab Emirates": { lat: 23.4241, lon: 53.8478 },
  "Oman": { lat: 21.4735, lon: 55.9754 },
  "Yemen": { lat: 15.5527, lon: 48.5164 }
});

// --- North America DXCC centroids ---
Object.assign(COUNTRY_CENTROIDS, {
  "United States": { lat: 39.8283, lon: -98.5795 },
  "Alaska": { lat: 64.2008, lon: -149.4937 },
  "Hawaii": { lat: 19.8968, lon: -155.5828 },
  "Canada": { lat: 56.1304, lon: -106.3468 },
  "Mexico": { lat: 23.6345, lon: -102.5528 },
  "Greenland": { lat: 71.7069, lon: -42.6043 },
  "Saint Pierre & Miquelon": { lat: 46.8852, lon: -56.3159 },
  "Bermuda": { lat: 32.3078, lon: -64.7505 },
  "St. Paul Island": { lat: 47.2330, lon: -60.1330 },
  "Sable Island": { lat: 43.9330, lon: -60.0000 },
  "Navassa Island": { lat: 18.4000, lon: -75.0000 },
  "Desecheo Island": { lat: 18.3830, lon: -67.4830 },
  "Revillagigedo": { lat: 18.7833, lon: -111.0000 },
  "Clipperton Island": { lat: 10.2833, lon: -109.2167 }
});

// --- Central America DXCC centroids ---
Object.assign(COUNTRY_CENTROIDS, {
  "Belize": { lat: 17.1899, lon: -88.4976 },
  "Guatemala": { lat: 15.7835, lon: -90.2308 },
  "El Salvador": { lat: 13.7942, lon: -88.8965 },
  "Honduras": { lat: 15.2000, lon: -86.2419 },
  "Nicaragua": { lat: 12.8654, lon: -85.2072 },
  "Costa Rica": { lat: 9.7489, lon: -83.7534 },
  "Panama": { lat: 8.5380, lon: -80.7821 },

  // DXCC‑specifikus külön entitások
  "San Andres & Providencia": { lat: 12.5833, lon: -81.7000 },   // HK0/A
  "Malpelo Island": { lat: 3.9833, lon: -81.5833 },              // HK0/M
  "Cocos Island": { lat: 5.5280, lon: -87.0560 }                 // TI9
});


// --- South America DXCC centroids ---
Object.assign(COUNTRY_CENTROIDS, {
  "Argentina": { lat: -38.4161, lon: -63.6167 },
  "Bolivia": { lat: -16.2902, lon: -63.5887 },
  "Brazil": { lat: -14.2350, lon: -51.9253 },
  "Chile": { lat: -35.6751, lon: -71.5430 },
  "Colombia": { lat: 4.5709, lon: -74.2973 },
  "Ecuador": { lat: -1.8312, lon: -78.1834 },
  "Guyana": { lat: 4.8604, lon: -58.9302 },
  "Paraguay": { lat: -23.4425, lon: -58.4438 },
  "Peru": { lat: -9.1900, lon: -75.0152 },
  "Suriname": { lat: 3.9193, lon: -56.0278 },
  "Uruguay": { lat: -32.5228, lon: -55.7658 },
  "Venezuela": { lat: 6.4238, lon: -66.5897 },

  // DXCC‑specifikus külön entitások
  "Galapagos Islands": { lat: -0.9538, lon: -90.9656 },            // HC8
  "Easter Island": { lat: -27.1127, lon: -109.3497 },             // CE0Y
  "Juan Fernandez Islands": { lat: -33.6400, lon: -78.8300 },     // CE0Z
  "San Felix & San Ambrosio": { lat: -26.2833, lon: -80.0833 },   // CE0X
  "Trinidad & Martim Vaz": { lat: -20.5000, lon: -29.3000 },      // PY0T
  "Fernando de Noronha": { lat: -3.8550, lon: -32.4233 },         // PY0F
  "St. Peter & St. Paul Rocks": { lat: 0.9167, lon: -29.3333 },   // PY0S
  "Falkland Islands": { lat: -51.7963, lon: -59.5236 },           // VP8/F
  "South Georgia Island": { lat: -54.5000, lon: -36.8000 },       // VP8/G
  "South Sandwich Islands": { lat: -59.4500, lon: -27.3500 }      // VP8/S
});


// --- Caribbean DXCC centroids ---
Object.assign(COUNTRY_CENTROIDS, {
  "Anguilla": { lat: 18.2206, lon: -63.0686 },              // VP2E
  "Antigua & Barbuda": { lat: 17.0608, lon: -61.7964 },     // V2
  "Aruba": { lat: 12.5211, lon: -69.9683 },                 // P4
  "Bahamas": { lat: 25.0343, lon: -77.3963 },               // C6
  "Barbados": { lat: 13.1939, lon: -59.5432 },              // 8P
  "Bonaire": { lat: 12.1784, lon: -68.2385 },               // PJ4
  "Curacao": { lat: 12.1696, lon: -68.9900 },               // PJ2
  "Saba & St. Eustatius": { lat: 17.4890, lon: -62.9730 },  // PJ5/PJ6
  "St. Maarten": { lat: 18.0425, lon: -63.0548 },           // PJ7
  "Cayman Islands": { lat: 19.3133, lon: -81.2546 },        // ZF
  "Cuba": { lat: 21.5218, lon: -77.7812 },                  // CO
  "Dominica": { lat: 15.4150, lon: -61.3710 },              // J7
  "Dominican Republic": { lat: 18.7357, lon: -70.1627 },    // HI
  "Grenada": { lat: 12.1165, lon: -61.6790 },               // J3
  "Guadeloupe": { lat: 16.2650, lon: -61.5510 },            // FG
  "Haiti": { lat: 18.9712, lon: -72.2852 },                 // HH
  "Jamaica": { lat: 18.1096, lon: -77.2975 },               // 6Y
  "Martinique": { lat: 14.6415, lon: -61.0242 },            // FM
  "Montserrat": { lat: 16.7425, lon: -62.1874 },            // VP2M
  "Puerto Rico": { lat: 18.2208, lon: -66.5901 },           // KP4
  "St. Barthelemy": { lat: 17.9000, lon: -62.8333 },        // FJ
  "St. Kitts & Nevis": { lat: 17.3578, lon: -62.7830 },     // V4
  "St. Lucia": { lat: 13.9094, lon: -60.9789 },             // J6
  "St. Vincent": { lat: 13.2528, lon: -61.1971 },           // J8
  "Trinidad & Tobago": { lat: 10.6918, lon: -61.2225 },     // 9Y/9Z
  "Turks & Caicos Islands": { lat: 21.6940, lon: -71.7979 },// VP5
  "Virgin Islands (US)": { lat: 18.3358, lon: -64.8963 },   // KP2
  "Virgin Islands (UK)": { lat: 18.4207, lon: -64.6400 }    // VP2V
});


// --- Oceania DXCC centroids ---
Object.assign(COUNTRY_CENTROIDS, {
  "Australia": { lat: -25.2744, lon: 133.7751 },               // VK
  "Papua New Guinea": { lat: -6.3149, lon: 143.9555 },         // P2
  "New Zealand": { lat: -40.9006, lon: 174.8860 },             // ZL
  "Fiji": { lat: -17.7134, lon: 178.0650 },                    // 3D2
  "Tonga": { lat: -21.1789, lon: -175.1982 },                  // A3
  "Samoa": { lat: -13.7590, lon: -172.1046 },                  // 5W
  "American Samoa": { lat: -14.2710, lon: -170.1322 },         // KH8
  "Cook Islands": { lat: -21.2367, lon: -159.7777 },           // E5
  "Niue": { lat: -19.0544, lon: -169.8672 },                   // E6
  "Tokelau": { lat: -9.2000, lon: -171.8500 },                 // ZK3
  "Tuvalu": { lat: -7.1095, lon: 177.6493 },                   // T2
  "Kiribati": { lat: 1.8709, lon: -157.3620 },                 // T3
  "Western Kiribati": { lat: 1.8709, lon: -157.3620 },         // T30
  "Central Kiribati": { lat: 3.5000, lon: -168.7333 },         // T31
  "Eastern Kiribati": { lat: 2.0000, lon: -157.0000 },         // T32
  "Nauru": { lat: -0.5228, lon: 166.9315 },                    // C2
  "Vanuatu": { lat: -15.3767, lon: 166.9592 },                 // YJ
  "Solomon Islands": { lat: -9.6457, lon: 160.1562 },          // H44
  "New Caledonia": { lat: -20.9043, lon: 165.6180 },           // FK
  "Norfolk Island": { lat: -29.0408, lon: 167.9547 },          // VK9N
  "Lord Howe Island": { lat: -31.5560, lon: 159.0830 },        // VK9L
  "Willis Island": { lat: -16.3000, lon: 149.9667 },           // VK9W
  "Cocos (Keeling) Islands": { lat: -12.1642, lon: 96.8710 },  // VK9C
  "Christmas Island": { lat: -10.4475, lon: 105.6904 },        // VK9X
  "Marquesas Islands": { lat: -9.0000, lon: -139.5000 },       // FO/M
  "Austral Islands": { lat: -23.3500, lon: -149.4833 },        // FO/A
  "Tuamotu Archipelago": { lat: -18.0000, lon: -142.0000 },    // FO/T
  "Society Islands": { lat: -17.6500, lon: -149.4500 },        // FO
  "Pitcairn Island": { lat: -25.0667, lon: -130.1000 },        // VP6
  "Ducie Island": { lat: -24.7000, lon: -124.7833 },           // VP6/D
  "Ogasawara": { lat: 27.0833, lon: 142.2000 },                // JD1/O
  "Minami Torishima": { lat: 24.2833, lon: 153.9833 },         // JD1/M
  "Chatham Islands": { lat: -43.9530, lon: -176.5400 },        // ZL7
  "Kermadec Islands": { lat: -29.2500, lon: -177.9167 },       // ZL8
  "Auckland & Campbell Islands": { lat: -50.7500, lon: 166.0000 } // ZL9
});


// --- Africa DXCC centroids ---
Object.assign(COUNTRY_CENTROIDS, {
  "Algeria": { lat: 28.0339, lon: 1.6596 },
  "Angola": { lat: -11.2027, lon: 17.8739 },
  "Benin": { lat: 9.3077, lon: 2.3158 },
  "Botswana": { lat: -22.3285, lon: 24.6849 },
  "Burkina Faso": { lat: 12.2383, lon: -1.5616 },
  "Burundi": { lat: -3.3731, lon: 29.9189 },
  "Cameroon": { lat: 7.3697, lon: 12.3547 },
  "Cape Verde": { lat: 16.5388, lon: -23.0418 },
  "Central African Republic": { lat: 6.6111, lon: 20.9394 },
  "Chad": { lat: 15.4542, lon: 18.7322 },
  "Comoros": { lat: -11.6455, lon: 43.3333 },
  "Congo": { lat: -0.2280, lon: 15.8277 },
  "Democratic Republic of the Congo": { lat: -4.0383, lon: 21.7587 },
  "Djibouti": { lat: 11.8251, lon: 42.5903 },
  "Egypt": { lat: 26.8206, lon: 30.8025 },
  "Equatorial Guinea": { lat: 1.6508, lon: 10.2679 },
  "Eritrea": { lat: 15.1794, lon: 39.7823 },
  "Eswatini": { lat: -26.5225, lon: 31.4659 },
  "Ethiopia": { lat: 9.1450, lon: 40.4897 },
  "Gabon": { lat: -0.8037, lon: 11.6094 },
  "Gambia": { lat: 13.4432, lon: -15.3101 },
  "Ghana": { lat: 7.9465, lon: -1.0232 },
  "Guinea": { lat: 9.9456, lon: -9.6966 },
  "Guinea-Bissau": { lat: 11.8037, lon: -15.1804 },
  "Ivory Coast": { lat: 7.5400, lon: -5.5471 },
  "Kenya": { lat: -0.0236, lon: 37.9062 },
  "Lesotho": { lat: -29.6100, lon: 28.2336 },
  "Liberia": { lat: 6.4281, lon: -9.4295 },
  "Libya": { lat: 26.3351, lon: 17.2283 },
  "Madagascar": { lat: -18.7669, lon: 46.8691 },
  "Malawi": { lat: -13.2543, lon: 34.3015 },
  "Mali": { lat: 17.5707, lon: -3.9962 },
  "Mauritania": { lat: 21.0079, lon: -10.9408 },
  "Mauritius": { lat: -20.3484, lon: 57.5522 },
  "Mayotte": { lat: -12.8275, lon: 45.1662 },
  "Morocco": { lat: 31.7917, lon: -7.0926 },
  "Mozambique": { lat: -18.6657, lon: 35.5296 },
  "Namibia": { lat: -22.9576, lon: 18.4904 },
  "Niger": { lat: 17.6078, lon: 8.0817 },
  "Nigeria": { lat: 9.0820, lon: 8.6753 },
  "Reunion Island": { lat: -21.1151, lon: 55.5364 },
  "Rwanda": { lat: -1.9403, lon: 29.8739 },
  "Sao Tome & Principe": { lat: 0.1864, lon: 6.6131 },
  "Senegal": { lat: 14.4974, lon: -14.4524 },
  "Seychelles": { lat: -4.6796, lon: 55.4920 },
  "Sierra Leone": { lat: 8.4606, lon: -11.7799 },
  "Somalia": { lat: 5.1521, lon: 46.1996 },
  "South Africa": { lat: -30.5595, lon: 22.9375 },
  "South Sudan": { lat: 6.8770, lon: 31.3070 },
  "Sudan": { lat: 12.8628, lon: 30.2176 },
  "Tanzania": { lat: -6.3690, lon: 34.8888 },
  "Togo": { lat: 8.6195, lon: 0.8248 },
  "Tunisia": { lat: 33.8869, lon: 9.5375 },
  "Uganda": { lat: 1.3733, lon: 32.2903 },
  "Zambia": { lat: -13.1339, lon: 27.8493 },
  "Zimbabwe": { lat: -19.0154, lon: 29.1549 },

  // DXCC‑specifikus külön entitások
  "Canary Islands": { lat: 28.2916, lon: -16.6291 },           // EA8
  "Madeira Islands": { lat: 32.7607, lon: -16.9595 },          // CT3
  "Ceuta & Melilla": { lat: 35.2833, lon: -2.9500 },           // EA9
  "Agalega & St. Brandon": { lat: -10.4500, lon: 56.6167 },    // 3B6/3B7
  "Rodrigues Island": { lat: -19.6833, lon: 63.4167 },         // 3B9
  "Amsterdam & St. Paul": { lat: -37.8333, lon: 77.5333 },     // FT8Z
  "Crozet Islands": { lat: -46.4300, lon: 51.8500 },           // FT8W
  "Kerguelen Islands": { lat: -49.3500, lon: 70.2167 },        // FT8X
  "Glorioso Islands": { lat: -11.5500, lon: 47.3333 },         // FT8G
  "Juan de Nova": { lat: -17.0667, lon: 42.7500 },             // FT8J
  "Tromelin Island": { lat: -15.8667, lon: 54.5167 }           // FT8T
});


// --- Middle East DXCC centroids ---
Object.assign(COUNTRY_CENTROIDS, {
  "Turkey": { lat: 38.9637, lon: 35.2433 },                 // TA
  "Cyprus": { lat: 35.1264, lon: 33.4299 },                 // 5B
  "Israel": { lat: 31.0461, lon: 34.8516 },                 // 4X/4Z
  "Palestine": { lat: 31.9000, lon: 35.2000 },              // E4
  "Jordan": { lat: 30.5852, lon: 36.2384 },                 // JY
  "Lebanon": { lat: 33.8547, lon: 35.8623 },                // OD
  "Syria": { lat: 34.8021, lon: 38.9968 },                  // YK
  "Iraq": { lat: 33.2232, lon: 43.6793 },                   // YI
  "Saudi Arabia": { lat: 23.8859, lon: 45.0792 },           // HZ
  "Kuwait": { lat: 29.3117, lon: 47.4818 },                 // 9K
  "Bahrain": { lat: 26.0667, lon: 50.5577 },                // A9
  "Qatar": { lat: 25.3548, lon: 51.1839 },                  // A7
  "United Arab Emirates": { lat: 23.4241, lon: 53.8478 },   // A6
  "Oman": { lat: 21.4735, lon: 55.9754 },                   // A4
  "Yemen": { lat: 15.5527, lon: 48.5164 },                  // 7O
  "Iran": { lat: 32.4279, lon: 53.6880 },                   // EP
  "Armenia": { lat: 40.0691, lon: 45.0382 },                // EK
  "Azerbaijan": { lat: 40.1431, lon: 47.5769 },             // 4J/4K
  "Georgia": { lat: 42.3154, lon: 43.3569 },                // 4L

  // DXCC‑specifikus külön entitások
  "Mount Athos": { lat: 40.1570, lon: 24.3300 },            // SV/A
  "Northern Cyprus": { lat: 35.2000, lon: 33.6000 }         // 1B (nem minden logban szerepel, de DXCC entitásként kezelik)
});


// --- Antarctica & Special DXCC Entities ---
Object.assign(COUNTRY_CENTROIDS, {
  // Antarctica main
  "Antarctica": { lat: -82.8628, lon: 135.0000 },                 // CE9

  // Subantarctic & remote DXCC islands
  "South Orkney Islands": { lat: -60.6333, lon: -45.2000 },       // VP8/O
  "South Shetland Islands": { lat: -62.0000, lon: -58.0000 },     // VP8/H
  "South Georgia Island": { lat: -54.5000, lon: -36.8000 },       // VP8/G (már szerepel, de maradhat)
  "South Sandwich Islands": { lat: -59.4500, lon: -27.3500 },     // VP8/S (már szerepel, de maradhat)

  // Australian Antarctic Territories
  "Heard Island": { lat: -53.1000, lon: 73.5167 },                // VK0H
  "Macquarie Island": { lat: -54.6167, lon: 158.8500 },           // VK0M

  // New Zealand Subantarctic
  "Campbell Island": { lat: -52.5333, lon: 169.1500 },            // ZL9 (már szerepel ZL9 blokkban)
  "Auckland Islands": { lat: -50.7500, lon: 166.0000 },           // ZL9 (szintén része)

  // French Southern Territories (FT/W, FT/X, FT/Z, FT/G, FT/J, FT/T)
  "Crozet Islands": { lat: -46.4300, lon: 51.8500 },              // FT8W (már szerepel)
  "Kerguelen Islands": { lat: -49.3500, lon: 70.2167 },           // FT8X (már szerepel)
  "Amsterdam & St. Paul": { lat: -37.8333, lon: 77.5333 },        // FT8Z (már szerepel)
  "Glorioso Islands": { lat: -11.5500, lon: 47.3333 },            // FT8G (már szerepel)
  "Juan de Nova": { lat: -17.0667, lon: 42.7500 },                // FT8J (már szerepel)
  "Tromelin Island": { lat: -15.8667, lon: 54.5167 },             // FT8T (már szerepel)

  // British Antarctic Territory (VP8/Antarctic sector)
  "British Antarctic Territory": { lat: -75.0000, lon: -45.0000 } // VP8/ANT
});

console.log("COUNTRY_CENTROIDS loaded:", Object.keys(COUNTRY_CENTROIDS).length, "entries");

