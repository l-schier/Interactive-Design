const express = require('express');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt'); // for password hashing
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  }));
app.use(bodyParser.json());
  

// Initialize SQLite database
const db = new sqlite3.Database('database.db');

// Create users table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT,  -- Allow the email field to be nullable
    password TEXT NOT NULL
  )
`);


// Route to handle user registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username already exists
    const existingUser = await queryAsync('SELECT * FROM users WHERE username = ?', [username]);
  
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }
  
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Insert the user into the database
    await queryAsync('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
  
    res.json({ message: 'User registered successfully' });
  });

// Route to handle user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = await queryAsync('SELECT * FROM users WHERE username = ?', [username]);

  if (user.length === 0) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user[0].password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  res.json({ message: 'Login successful' });
});

// Helper function to execute SQL queries with promises
function queryAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
