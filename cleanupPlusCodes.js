const Database = require("better-sqlite3");
const fs = require("fs");
const db = new Database("onde.db"); // or adjust path if needed

const plusCodeRegex = /^\w{4}\+\w{2}/;

const venues = db.prepare("SELECT * FROM venues").all();

const cleanedVenues = [];

for (const venue of venues) {
  let updated = false;
  let newName = venue.name;
  let newAddress = venue.address;

  // Clean name if it's just a Plus Code
  if (plusCodeRegex.test(newName) && newName.length <= 10) {
    newName = "[Unnamed Venue]";
    updated = true;
  }

  // Remove Plus Code from start of address
  if (plusCodeRegex.test(newAddress)) {
    const parts = newAddress.split(",");
    if (parts.length > 1) {
      newAddress = parts.slice(1).join(",").trim();
      updated = true;
    }
  }

  if (updated) {
    cleanedVenues.push({
      id: venue.id,
      oldName: venue.name,
      newName,
      oldAddress: venue.address,
      newAddress,
    });

    db.prepare(
      "UPDATE venues SET name = ?, address = ? WHERE id = ?"
    ).run(newName, newAddress, venue.id);
  }
}

// Optional: write to log file
fs.writeFileSync("cleaned_venues_backup.json", JSON.stringify(cleanedVenues, null, 2));

console.log(`✅ Cleaned ${cleanedVenues.length} venues. Backup saved to cleaned_venues_backup.json`);
