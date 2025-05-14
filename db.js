const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Point to the correct DB file
const dbPath = path.join(__dirname, 'onde.db');

// Open connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Failed to connect to database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database at:", dbPath);
  }
});

module.exports = db;
