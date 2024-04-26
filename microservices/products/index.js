// index.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const db = new sqlite3.Database(":memory:"); // In-memory for simplicity

db.serialize(() => {
  db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT)");
  db.run('INSERT INTO products (name) VALUES ("Product A"), ("Product B")');
});

const app = express();
app.use(bodyParser.json());

app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

const port = 3002;
app.listen(port, () => {
  console.log(`Products service running at http://localhost:${port}`);
});
