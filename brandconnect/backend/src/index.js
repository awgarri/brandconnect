const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config({path: './.env'});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// MySQL connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'drewski',           // Hardcode your username
  password: 'KJ*&e7Cu?-LM26i', // Hardcode your password
  database: 'JesseBC',         // Hardcode your database name
});

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Example endpoint
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
