// controllers/locationController.js
const db = require('../db'); // ✅ Use correct DB import

// ----------- Province Routes -----------
const getProvinces = (req, res) => {
  try {
    const provinces = db.prepare("SELECT id, name FROM provinces ORDER BY name ASC").all();
    res.json(provinces);
  } catch (error) {
    console.error("❌ Failed to get provinces:", error);
    res.status(500).json({ error: "Failed to fetch provinces" });
  }
};

const getProvincesWithCities = (req, res) => {
  try {
    const provinces = db.prepare("SELECT * FROM provinces ORDER BY name ASC").all();
    const cities = db.prepare("SELECT * FROM cities ORDER BY name ASC").all();

    const result = provinces.map((prov) => ({
      ...prov,
      cities: cities.filter((city) => city.province_id === prov.id),
    }));

    res.json(result);
  } catch (err) {
    console.error("❌ Failed to get provinces with cities:", err);
    res.status(500).json({ error: "Failed to fetch provinces with cities" });
  }
};

// ----------- City Routes -----------
const getCitiesByProvince = (req, res) => {
  const { provinceId } = req.params;
  try {
    const cities = db
      .prepare("SELECT id, name FROM cities WHERE province_id = ? ORDER BY name ASC")
      .all(provinceId);
    res.json(cities);
  } catch (error) {
    console.error("❌ Failed to get cities:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
};

// ----------- Province Management -----------
const createProvince = (req, res) => {
  const { name } = req.body;
  try {
    const result = db.prepare("INSERT INTO provinces (name) VALUES (?)").run(name);
    res.json({ id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: "Failed to create province." });
  }
};

const updateProvince = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    db.prepare("UPDATE provinces SET name = ? WHERE id = ?").run(name, id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Failed to update province." });
  }
};

const deleteProvince = (req, res) => {
  const { id } = req.params;
  try {
    db.prepare("DELETE FROM provinces WHERE id = ?").run(id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete province." });
  }
};

// ----------- City Management -----------
const addCityToProvince = (req, res) => {
  const { provinceId } = req.params;
  const { name } = req.body;
  try {
    const result = db
      .prepare("INSERT INTO cities (name, province_id) VALUES (?, ?)")
      .run(name, provinceId);
    res.json({ id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: "Failed to add city." });
  }
};

const updateCity = (req, res) => {
  const { id } = req.params;
  const { name, province_id } = req.body;
  try {
    db.prepare("UPDATE cities SET name = ?, province_id = ? WHERE id = ?").run(
      name,
      province_id,
      id
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Failed to update city." });
  }
};

const deleteCity = (req, res) => {
  const { id } = req.params;
  try {
    db.prepare("DELETE FROM cities WHERE id = ?").run(id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete city." });
  }
};

// ---------- Export ----------
module.exports = {
  getProvinces,
  getProvincesWithCities,
  getCitiesByProvince,
  createProvince,
  updateProvince,
  deleteProvince,
  addCityToProvince,
  updateCity,
  deleteCity,
};
