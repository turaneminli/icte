// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // In-memory database for simplicity

// Create tables
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)');
  db.run('CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT)');
  db.run('CREATE TABLE orders (id INTEGER PRIMARY KEY, userId INTEGER, productId INTEGER)');
});

// Insert some initial data
db.serialize(() => {
  db.run('INSERT INTO users (name) VALUES ("John Doe"), ("Jane Smith")');
  db.run('INSERT INTO products (name) VALUES ("Product A"), ("Product B")');
});

module.exports = db;
