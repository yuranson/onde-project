const db = require("../db"); // Ensure your db instance is exported from backend/db.js or backend/index.js

// GET all venues
const getAllVenues = (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM venues");
    const venues = stmt.all();
    res.json(venues);
  } catch (err) {
    console.error("❌ Error fetching venues:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST new venue
const createVenue = (req, res) => {
  const { name, address, latitude, longitude, province_id, city_id, category } = req.body;

  if (!name || !address || !latitude || !longitude || !province_id || !city_id || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO venues (name, address, latitude, longitude, province_id, city_id, category)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, address, latitude, longitude, province_id, city_id, category);
    const newVenue = { id: result.lastInsertRowid, ...req.body };

    res.status(201).json(newVenue);
  } catch (err) {
    console.error("❌ Error creating venue:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT update venue
const updateVenue = (req, res) => {
  const { id } = req.params;
  const { name, address, latitude, longitude, province_id, city_id, category } = req.body;

  try {
    const stmt = db.prepare(`
      UPDATE venues
      SET name = ?, address = ?, latitude = ?, longitude = ?, province_id = ?, city_id = ?, category = ?
      WHERE id = ?
    `);
    stmt.run(name, address, latitude, longitude, province_id, city_id, category, id);
    res.json({ message: "Venue updated successfully" });
  } catch (err) {
    console.error("❌ Error updating venue:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE venue
const deleteVenue = (req, res) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare("DELETE FROM venues WHERE id = ?");
    stmt.run(id);
    res.json({ message: "Venue deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting venue:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllVenues,
  createVenue,
  updateVenue,
  deleteVenue,
};
