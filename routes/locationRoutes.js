const express = require('express');
const router = express.Router();
const db = require('../initDB'); // ✅ Direct DB access

// ✅ GET /api/provinces
router.get('/provinces', (req, res) => {
  try {
    const provinces = db.prepare('SELECT * FROM provinces ORDER BY name').all();
    res.json(provinces);
  } catch (err) {
    console.error("❌ Error fetching provinces:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ GET /api/cities/by-province/:provinceId
router.get('/cities/by-province/:provinceId', (req, res) => {
  try {
    const cities = db.prepare('SELECT * FROM cities WHERE province_id = ? ORDER BY name').all(req.params.provinceId);
    res.json(cities);
  } catch (err) {
    console.error("❌ Error fetching cities:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
