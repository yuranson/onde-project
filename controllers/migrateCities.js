// migrateCities.js

const db = require('../db');

try {
  // Step 1: Create new table with UNIQUE constraint
  db.prepare(`
    CREATE TABLE IF NOT EXISTS cities_temp (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      province_id INTEGER NOT NULL,
      UNIQUE(name, province_id)
    )
  `).run();

  // Step 2: Copy data (ignoring duplicates)
  db.prepare(`
    INSERT OR IGNORE INTO cities_temp (name, province_id)
    SELECT name, province_id FROM cities
  `).run();

  // Step 3: Drop old table
  db.prepare('DROP TABLE cities').run();

  // Step 4: Rename new table
  db.prepare('ALTER TABLE cities_temp RENAME TO cities').run();

  console.log('✅ Migration complete.');
} catch (err) {
  console.error('❌ Migration failed:', err);
}
