// Import necessary modules at the top
const express = require('express');  // Ensure express is correctly imported
const cors = require('cors');        // Ensure cors is correctly imported
const path = require('path');        // Path module to manage file paths

const app = express();  // Initialize the app with express

// Middleware to handle CORS and JSON parsing
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Enable JSON parsing for request bodies

// 📦 Load API route modules
try {
  const venueRoutes = require('./routes/venueRoutes');  // Ensure route modules are properly defined
  const sponsorRoutes = require('./routes/sponsorRoutes');
  const locationRoutes = require('./routes/locationRoutes');

  // Attach routes to the API paths
  app.use('/api/venues', venueRoutes);  // Route for venues
  app.use('/api/sponsors', sponsorRoutes);  // Route for sponsors
  app.use('/api/locations', locationRoutes);  // Route for locations

  console.log("✅ All API routes mounted.");
} catch (err) {
  console.error("❌ Route loading failed:", err.message);
  process.exit(1);  // Exit if routes fail to load
}

// 🌐 Serve frontend build
const frontendPath = path.resolve(__dirname, '../frontend/dist');
const indexHtml = path.join(frontendPath, 'index.html');

// Static files for frontend
app.use(express.static(frontendPath));  // Serve static frontend files

// Catch-all route for frontend (SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(indexHtml);  // Serve index.html for all paths
});

// 🚀 Start backend server
const PORT = process.env.PORT || 3001;  // Use process.env.PORT for deployment flexibility
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
