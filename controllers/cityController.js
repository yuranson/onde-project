const db = require("../db");

// Get cities filtered by province ID
const getCitiesByProvince = (req, res) => {
  const { provinceId } = req.params;
  try {
    const stmt = db.prepare("SELECT * FROM cities WHERE province_id = ?");
    const cities = stmt.all(provinceId);
    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities by province:", error);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
};

module.exports = {
  getCitiesByProvince,
};

