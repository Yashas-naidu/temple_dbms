const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // or any port you prefer

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yashashsn', // replace with your MySQL password
  database: 'templetrek' // replace with your MySQL database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
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
