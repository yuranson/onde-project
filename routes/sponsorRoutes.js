const express = require('express');
const router = express.Router();
const db = require('../initDB'); // ✅ Corrected

// ✅ GET all sponsors
router.get('/', (req, res) => {
  try {
    const sponsors = db.prepare(`SELECT * FROM sponsors ORDER BY id DESC`).all();
    res.json(sponsors);
  } catch (err) {
    console.error("❌ Error fetching sponsors:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ GET sponsors by category
router.get('/by-category/:category', (req, res) => {
  try {
    const stmt = db.prepare(`SELECT * FROM sponsors WHERE category = ? ORDER BY id DESC`);
    const data = stmt.all(req.params.category);
    res.json(data);
  } catch (err) {
    console.error("❌ Error loading sponsors by category:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ GET sponsors by city
router.get('/by-city/:cityId', (req, res) => {
  try {
    const stmt = db.prepare(`SELECT * FROM sponsors WHERE city_id = ? ORDER BY id DESC`);
    const data = stmt.all(req.params.cityId);
    res.json(data);
  } catch (err) {
    console.error("❌ Error loading sponsors by city:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ GET sponsors by province
router.get('/by-province/:provinceId', (req, res) => {
  try {
    const stmt = db.prepare(`SELECT * FROM sponsors WHERE province_id = ? ORDER BY id DESC`);
    const data = stmt.all(req.params.provinceId);
    res.json(data);
  } catch (err) {
    console.error("❌ Error loading sponsors by province:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ POST new sponsor
router.post('/', (req, res) => {
  try {
    const { name, logo_url, category, city_id, province_id } = req.body;
    if (!name || !logo_url || !category) {
      return res.status(400).send("Missing required fields");
    }

    const stmt = db.prepare(`
      INSERT INTO sponsors (name, logo_url, category, city_id, province_id)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(name, logo_url, category, city_id || null, province_id || null);
    res.status(201).json({ id: info.lastInsertRowid });
  } catch (err) {
    console.error("❌ Error saving sponsor:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ GET sponsor by ID (MUST BE LAST)
router.get('/:id', (req, res) => {
  try {
    const sponsor = db.prepare(`SELECT * FROM sponsors WHERE id = ?`).get(req.params.id);
    if (!sponsor) return res.status(404).send("Sponsor not found");
    res.json(sponsor);
  } catch (err) {
    console.error("❌ Error getting sponsor:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ DELETE sponsor
router.delete('/:id', (req, res) => {
  try {
    const stmt = db.prepare(`DELETE FROM sponsors WHERE id = ?`);
    stmt.run(req.params.id);
    res.status(200).send("Sponsor deleted");
  } catch (err) {
    console.error("❌ Error deleting sponsor:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
