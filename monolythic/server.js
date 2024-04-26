// index.js
const express = require("express");
const db = require("./database");
const bodyParser = require("body-parser");

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

app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.get("/orders", (req, res) => {
  db.all("SELECT * FROM orders", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post("/orders", (req, res) => {
  const { userId, productId } = req.body;
  const stmt = db.prepare(
    "INSERT INTO orders (userId, productId) VALUES (?, ?)"
  );
  stmt.run(userId, productId, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ orderId: this.lastID });
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Monolithic app running at http://localhost:${port}`);
});
