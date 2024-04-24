// server.js
const express = require('express');
const mysqlConnection = require('./db'); // Assuming db.js is in the same directory
const app = express();

// Middleware
app.use(express.json());

// Test MySQL connection
mysqlConnection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database');
    console.log('MySQL Server version is: ', results[0].solution);
  }
});

// Routes
app.get('/api/data', (req, res) => {
  // Handle database operations here
  res.json({ message: 'Data from MySQL' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
