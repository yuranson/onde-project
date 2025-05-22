const express = require('express');
const router = express.Router();
const db = require('../initDB'); // ✅ Corrected

// ✅ GET all venues
router.get('/', (req, res) => {
  try {
    const venues = db.prepare(`SELECT * FROM venues ORDER BY created_at DESC`).all();
    res.json(venues);
  } catch (err) {
    console.error("❌ Error fetching venues:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ POST new venue
router.post('/', (req, res) => {
  try {
    const { name, address, latitude, longitude, province_id, city_id, category } = req.body;
    if (!name || !province_id || !city_id || !latitude || !longitude || !category) {
      return res.status(400).send("Missing required fields");
    }

    const stmt = db.prepare(`
      INSERT INTO venues (name, address, latitude, longitude, province_id, city_id, category)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(name, address, latitude, longitude, province_id, city_id, category);
    res.status(201).json({ id: info.lastInsertRowid });
  } catch (err) {
    console.error("❌ Error saving venue:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ PUT update venue
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, latitude, longitude, province_id, city_id, category } = req.body;
    if (!name || !province_id || !city_id || !latitude || !longitude || !category) {
      return res.status(400).send("Missing required fields");
    }

    const stmt = db.prepare(`
      UPDATE venues
      SET name = ?, address = ?, latitude = ?, longitude = ?, province_id = ?, city_id = ?, category = ?
      WHERE id = ?
    `);
    stmt.run(name, address, latitude, longitude, province_id, city_id, category, id);
    res.status(200).send("Venue updated");
  } catch (err) {
    console.error("❌ Error updating venue:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ DELETE venue
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare(`DELETE FROM venues WHERE id = ?`);
    stmt.run(id);
    res.status(200).send("Venue deleted");
  } catch (err) {
    console.error("❌ Error deleting venue:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
