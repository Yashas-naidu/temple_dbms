const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');  // For password hashing

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yashashsn',  // Replace with your MySQL password
  database: 'templetrek'  // Replace with your MySQL database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// SIGN UP route
app.post('/api/signup', async (req, res) => {
  const { username, email, password, phone, address } = req.body;  // Destructure additional fields

  // Check if user already exists
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], async (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      return res.status(400).send('User already exists');
    } else {
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user with additional fields
      const insertUserQuery = 'INSERT INTO users (username, email, password, phone, address) VALUES (?, ?, ?, ?, ?)';
      db.query(insertUserQuery, [username, email, hashedPassword, phone, address], (err, result) => {
        if (err) throw err;
        res.send('User registered successfully');
      });
    }
  });
});

// SIGN IN route
app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], async (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(400).send('User not found');
    } else {
      const user = result[0];

      // Compare the hashed password with the entered password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Invalid credentials');
      }

      res.send('Sign in successful');
    }
  });
});

// Example route for bookings
app.post('/api/bookings', (req, res) => {
  const { temple, bookingType, checkIn, checkOut, numberOfDays, date, timeSlot } = req.body;
  const query = 'INSERT INTO bookings (temple, bookingType, checkIn, checkOut, numberOfDays, date, timeSlot) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [temple, bookingType, checkIn, checkOut, numberOfDays, date, timeSlot], (err, result) => {
    if (err) throw err;
    res.send('Booking created');
  });
});

// Example route for donations
app.post('/api/donations', (req, res) => {
  const { name, phone, address, donationType, donationAmount } = req.body;
  const query = 'INSERT INTO donations (name, phone, address, donationType, donationAmount) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, phone, address, donationType, donationAmount], (err, result) => {
    if (err) throw err;
    res.send('Donation received');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
