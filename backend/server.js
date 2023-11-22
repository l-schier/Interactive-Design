const express = require('express');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(bodyParser.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize SQLite database
const db = new sqlite3.Database('database.db');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create users table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT,
    password TEXT NOT NULL
  )
`);

// Create posts table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    image TEXT,  -- Add the 'image' column
    FOREIGN KEY (userId) REFERENCES users(id)
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

// Route to handle post creation
app.post('/createPost', upload.single('file'), async (req, res) => {
  const { username, title, content } = req.body;
  const userId = await getUserIdByUsername(username);

  // Check if the file field exists in the request
  const imagePath = req.file ? `uploads/${req.file.filename}` : null;

  // Insert the post into the database
  await queryAsync('INSERT INTO posts (userId, title, content, image) VALUES (?, ?, ?, ?)', [userId, title, content, imagePath]);

  res.json({ message: 'Post created successfully' });
});

// Route to get all posts
app.get('/getPosts', async (req, res) => {
  try {
    const posts = await queryAsync('SELECT * FROM posts');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
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

// Route to handle upvoting a post
app.put('/upvote/:postId', async (req, res) => {
  const { postId } = req.params;

  // Increment the upvotes for the post with the specified postId
  await queryAsync('UPDATE posts SET upvotes = upvotes + 1 WHERE id = ?', [postId]);

  res.json({ message: 'Upvote successful' });
});

// Route to handle downvoting a post
app.put('/downvote/:postId', async (req, res) => {
  const { postId } = req.params;

  // Increment the downvotes for the post with the specified postId
  await queryAsync('UPDATE posts SET downvotes = downvotes + 1 WHERE id = ?', [postId]);

  res.json({ message: 'Downvote successful' });
});

// Helper function to get user ID by username
async function getUserIdByUsername(username) {
  const user = await queryAsync('SELECT id FROM users WHERE username = ?', [username]);
  return user.length > 0 ? user[0].id : null;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
