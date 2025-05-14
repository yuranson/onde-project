const express = require('express');
const router = express.Router();
const { getProvinces, getCitiesByProvince } = require('../controllers/locationController');

// ✅ GET /api/provinces
router.get('/provinces', getProvinces);

// ✅ GET /api/cities/by-province/:provinceId
router.get('/cities/by-province/:provinceId', getCitiesByProvince);

module.exports = router;
