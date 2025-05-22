const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

// ✅ Confirm path and files
console.log('🧭 Running server.js from:', __dirname);
console.log('📄 Files here:', fs.readdirSync(__dirname));

console.log("🚀 Requiring initDB...");
const db = require('./initDB');
console.log("✅ initDB loaded!");

console.log("🚀 Requiring routes...");
const venueRoutes = require('./routes/venueRoutes');
const sponsorRoutes = require('./routes/sponsorRoutes');
const provinceRoutes = require('./routes/provinceRoutes');
console.log("✅ All routes loaded!");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ API Endpoints
app.use('/api/venues', venueRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/provinces', provinceRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
