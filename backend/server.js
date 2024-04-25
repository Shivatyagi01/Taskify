const express = require('express');
const cors = require('cors'); // Import cors middleware
const app = express();
const port = 5000;

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'taskify'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database...');
});

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data from MySQL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
