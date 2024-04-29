const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 5000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "taskify",
});

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;

  connection.query(query, [username, password], (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error logging in" });
      return;
    }

    if (results.length === 1) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});