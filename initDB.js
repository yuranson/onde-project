// backend/initDB.js
const db = require('./db');

// Create all tables
db.prepare(`
  CREATE TABLE IF NOT EXISTS provinces (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS cities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    province_id INTEGER NOT NULL,
    FOREIGN KEY (province_id) REFERENCES provinces(id)
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS venues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    latitude REAL,
    longitude REAL,
    province_id INTEGER,
    city_id INTEGER,
    category TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (province_id) REFERENCES provinces(id),
    FOREIGN KEY (city_id) REFERENCES cities(id)
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS sponsors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    city_id INTEGER,
    province_id INTEGER,
    category TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

console.log("✅ All tables initialized.");
