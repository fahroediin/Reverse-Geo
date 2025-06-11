import axios from 'axios';

export default async function handler(req, res) {
  const { lat, lon, fields } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon parameter' });
  }

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat,
        lon,
        format: 'json',
        addressdetails: 1
      },
      headers: {
        'User-Agent': 'YourAppName' // ubah ke nama app kamu
      }
    });

    const address = response.data.address;

    // Mapping field ke key address OpenStreetMap
    const fieldMap = {
      desa: address.village || address.hamlet,
      kecamatan: address.suburb || address.city_district || address.municipality,
      kabupaten: address.county,
      provinsi: address.region || address.state,
      zipcode: address.postcode,
      negara: address.country
    };

    if (fields) {
      const requested = fields.split(',').map(f => f.trim().toLowerCase());
      const result = {};

      requested.forEach(field => {
        if (field in fieldMap) {
          result[field] = fieldMap[field] || null;
        }
      });

      return res.json(result);
    }

    // Jika tidak ada parameter "fields", kembalikan semua
    return res.json(fieldMap);

  } catch (error) {
    return res.status(500).json({ error: 'Failed to reverse geocode', details: error.message });
  }
}
