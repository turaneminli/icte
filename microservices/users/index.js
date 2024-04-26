// index.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const db = new sqlite3.Database(":memory:"); // In-memory for simplicity

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)");
  db.run('INSERT INTO users (name) VALUES ("John Doe"), ("Jane Smith")');
});

const app = express();
app.use(bodyParser.json());

app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Users service running at http://localhost:${port}`);
});
