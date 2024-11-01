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
  const { username, email, password, phone, address } = req.body;

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

// SIGN IN route with session recording
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

      // Insert sign-in details into the session table
      const sessionQuery = 'INSERT INTO session (user_id, sign_in_time) VALUES (?, NOW())';
      db.query(sessionQuery, [user.id], (err, sessionResult) => {
        if (err) {
          console.error("Error inserting session data:", err);
          return res.status(500).send('Error creating session');
        }
        res.send('Sign in successful');
      });
    }
  });
});

// Example route for bookings
app.post('/api/bookings', (req, res) => {
  const { temple, bookingType, serviceType, date, timeSlot } = req.body;
  const query = 'INSERT INTO bookings (temple, bookingType, serviceType, date, timeSlot) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [temple, bookingType, serviceType, date, timeSlot], (err, result) => {
    if (err) {
      console.error("Error creating booking:", err);
      return res.status(500).send('Error creating booking');
    }
    res.status(201).send('Booking created');
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

// Event registration route
app.post("/events", (req, res) => {
  const { event, numberOfAttendees } = req.body;
  const query = "INSERT INTO events (event, numberOfAttendees) VALUES (?, ?)";
  db.query(query, [event, numberOfAttendees], (err, result) => {
      if (err) {
          console.error("Error inserting data: ", err);
          return res.status(500).send("Error inserting data");
      }
      res.status(200).send("Event registration successful!");
  });
});

// Endpoint to get the latest session
app.get('/api/session/latest', (req, res) => {
  const query = `
    SELECT session.*, users.username, users.email, users.phone, users.address
    FROM session
    JOIN users ON session.user_id = users.id
    ORDER BY session.sign_in_time DESC
    LIMIT 1
  `;
  
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching latest session:", err);
      return res.status(500).send('Error fetching session data');
    }
    
    if (result.length === 0) {
      return res.status(404).send('No session data found');
    }
    
    res.json(result[0]);
  });
});



// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
