// db.js
const path = require("path");
const Database = require("better-sqlite3");

// 💾 Absolute path to your actual database file
const dbPath = path.resolve(__dirname, "onde.db");

console.log("🗂️ Using DB at:", dbPath);

const db = new Database(dbPath);
module.exports = db;
