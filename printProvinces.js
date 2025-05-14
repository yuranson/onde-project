const path = require("path");
const Database = require("better-sqlite3");

// Connect to the DB
const db = new Database(path.join(__dirname, "onde.db"));

// Fetch provinces
const provinces = db.prepare("SELECT id, name FROM provinces").all();

console.log("📍 Provinces:");
console.table(provinces);
