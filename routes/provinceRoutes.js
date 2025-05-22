const express = require('express');
const router = express.Router();
const db = require('../initDB');

router.get('/', (req, res) => {
  try {
    const provinces = db.prepare('SELECT * FROM provinces').all();
    res.json(provinces);
  } catch (err) {
    console.error('Error fetching provinces:', err);
    res.status(500).json({ error: 'Failed to load provinces' });
  }
});

module.exports = router;
