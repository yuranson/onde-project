const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./initDB');
const venueRoutes = require('./routes/venueRoutes');
const sponsorRoutes = require('./routes/sponsorRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/venues', venueRoutes);
app.use('/api/sponsors', sponsorRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
🧱 initDB.js
js
Copy
Edit
const path = require('path');
const Database = require('better-sqlite3');

const db = new Database(path.join(__dirname, 'onde.db'));

module.exports = db;
🧱 .render.yaml
yaml
Copy
Edit
services:
  - type: web
    name: onde-backend
    env: node
    plan: free
    buildCommand: npm install
    startCommand: node index.js
    rootDir: .
✅ Where to Put Them
Go to C:\Users\yuran\onde-project\

Create new files:

index.js

initDB.js

.render.yaml

Paste in the code above

Add and commit:

bash
Copy
Edit
git add index.js initDB.js .render.yaml
git commit -m "Restore backend core files"
git push origin main
🔁 Then
Go to Render

Make sure Root Directory is blank

Clear build cache

Deploy latest commit

Say lg: when you're ready to create and paste the files — or upload and I’ll verify.








You said:


before this, should I repaste the files back to backend?

ChatGPT said:
Yes — you must move the backend files back into the backend/ folder before you try deploying again.

✅ Here's what to do now:
1. Move these files and folders into backend/:
From the root onde-project folder (where they are now), move the following into onde-project/backend/:

index.js

initDB.js

package.json

package-lock.json

routes/

controllers/

onde.db (and the .db-shm, .db-wal)

.render.yaml (if you had it before)

printProvinces.js (optional, if needed)

2. Confirm you now have this structure:
pgsql
Copy
Edit
onde-project/
├── backend/
│   ├── index.js
│   ├── initDB.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .render.yaml
│   ├── onde.db
│   ├── routes/
│   ├── controllers/
3. Go to Render and in the backend service settings, set this:
Root Directory: backend

4. Then click Deploy again.
Once you confirm you've repasted the files, say CHECK IT, and I’ll verify based on your next screenshot.








