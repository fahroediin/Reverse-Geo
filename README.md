# 🌍 Reverse Geocode API

API sederhana berbasis Node.js + Express untuk mengambil informasi lokasi (desa, kecamatan, kabupaten, provinsi, kode pos, negara) dari koordinat latitude dan longitude, menggunakan layanan Nominatim (OpenStreetMap).

## 🚀 Fitur

- Reverse geocoding dari koordinat (`lat`, `lon`)
- Bisa memilih data yang diinginkan melalui parameter `fields`
- Siap dijalankan **secara lokal** atau di-deploy ke **Vercel**
- Tidak menyimpan data — langsung fetch dari OSM API

## 📦 Instalasi

```bash
git clone https://github.com/fahroediin/Reverse-Geo.git
cd reverse-geocode-api
npm install

▶️ Menjalankan Secara Lokal
node index.js

Server akan berjalan di:
http://localhost:8000

📌 Endpoint
GET /reverse-geocode

🔗 Query Parameters:
| Parameter | Tipe   | Wajib | Deskripsi                                                                                          |
| --------- | ------ | ----- | -------------------------------------------------------------------------------------------------- |
| `lat`     | string | ✅     | Latitude lokasi                                                                                    |
| `lon`     | string | ✅     | Longitude lokasi                                                                                   |
| `fields`  | string | ❌     | Daftar data yang ingin ditampilkan, pisahkan dengan koma. <br>Contoh: `provinsi,kabupaten,zipcode` |

📤 Contoh Permintaan
🔹 Semua Data:
GET /reverse-geocode?lat=-6.3275257&lon=106.6236931

Respons:
{
  "desa": "Cisauk",
  "kecamatan": "Cisauk",
  "kabupaten": "Kabupaten Tangerang",
  "provinsi": "Jawa",
  "zipcode": "15341",
  "negara": "Indonesia"
}

🔹 Filter Tertentu (Misal: Provinsi dan Zipcode):
GET /reverse-geocode?lat=-6.3275257&lon=106.6236931&fields=provinsi,zipcode

Respons:
{
  "provinsi": "Jawa",
  "zipcode": "15341"
}

🛠 Teknologi
Node.js
Express.js
Axios
OpenStreetMap Nominatim API

🚫 Catatan Penting
Pastikan koneksi internet aktif (karena data diambil live dari OpenStreetMap).
Gunakan header User-Agent yang valid (sudah disiapkan di kode).
Jangan menyalahgunakan API Nominatim (maks. 1 request per detik jika digunakan massal).


