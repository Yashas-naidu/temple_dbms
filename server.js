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
  database: 'temple'  // Replace with your MySQL database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Endpoint to fetch events for the current user
// Endpoint to fetch events for the current user
app.get('/api/events/user', (req, res) => {
  const latestSessionQuery = `
    SELECT user_id
    FROM session
    ORDER BY sign_in_time DESC
    LIMIT 1
  `;

  db.query(latestSessionQuery, (err, sessionResult) => {
    if (err) {
      console.error("Error fetching latest session:", err);
      return res.status(500).send('Error fetching session data');
    }

    if (sessionResult.length === 0) {
      return res.status(404).send('No active session found. Please sign in.');
    }

    const user_id = sessionResult[0].user_id;

    const eventsQuery = `
      SELECT events.event, events.numberOfAttendees
      FROM events
      JOIN session ON events.user_id = session.user_id
      WHERE session.user_id = ?
    `;

    db.query(eventsQuery, [user_id], (err, eventsResult) => {
      if (err) {
        console.error("Error fetching events:", err);
        return res.status(500).send('Error fetching events data');
      }

      if (eventsResult.length === 0) {
        return res.status(404).send('No events found for the user');
      }

      res.json(eventsResult); // Return events data to the frontend
    });
  });
});



// Fetch bookings and donations for the current user
app.get('/api/user-details', (req, res) => {
  const latestSessionQuery = `
    SELECT user_id
    FROM session
    ORDER BY sign_in_time DESC
    LIMIT 1
  `;

  db.query(latestSessionQuery, (err, sessionResult) => {
    if (err) {
      console.error("Error fetching latest session:", err);
      return res.status(500).send('Error fetching session data');
    }

    if (sessionResult.length === 0) {
      return res.status(404).send('No active session found. Please sign in.');
    }

    const user_id = sessionResult[0].user_id;

    const bookingsQuery = `SELECT * FROM bookings WHERE user_id = ?`;
    const donationsQuery = `SELECT * FROM donations WHERE user_id = ?`;

    db.query(bookingsQuery, [user_id], (err, bookingsResult) => {
      if (err) {
        console.error("Error fetching bookings:", err);
        return res.status(500).send('Error fetching bookings data');
      }

      db.query(donationsQuery, [user_id], (err, donationsResult) => {
        if (err) {
          console.error("Error fetching donations:", err);
          return res.status(500).send('Error fetching donations data');
        }

        res.json({ bookings: bookingsResult, donations: donationsResult });
      });
    });
  });
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
// Booking route with user_id from the latest session
app.post('/api/bookings', (req, res) => {
  const { temple, bookingType, startDate, endDate, amount } = req.body;

  // Query to get the user_id from the most recent session
  const latestSessionQuery = `
    SELECT user_id
    FROM session
    ORDER BY sign_in_time DESC
    LIMIT 1
  `;

  db.query(latestSessionQuery, (err, sessionResult) => {
    if (err) {
      console.error("Error fetching latest session:", err);
      return res.status(500).send('Error creating booking');
    }

    if (sessionResult.length === 0) {
      return res.status(404).send('No active session found. Please sign in.');
    }

    // Retrieve user_id from the latest session result
    const user_id = sessionResult[0].user_id;

    // Insert booking record with user_id from the latest session
    const bookingQuery = `
      INSERT INTO bookings (user_id, temple, booking_type, start_date, end_date, amount) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(bookingQuery, [user_id, temple, bookingType, startDate, endDate, amount], (err, result) => {
      if (err) {
        console.error("Error inserting booking:", err);
        return res.status(500).send('Internal server error');
      }
      res.status(201).send('Booking created successfully');
    });
  });
});


app.post('/api/donations', (req, res) => {
  const { name, phone, address, donationType, donationAmount } = req.body;

  // Get user_id from the latest session
  const latestSessionQuery = `
    SELECT user_id
    FROM session
    ORDER BY sign_in_time DESC
    LIMIT 1
  `;

  db.query(latestSessionQuery, (err, sessionResult) => {
    if (err) {
      console.error("Error fetching latest session:", err);
      return res.status(500).send('Error fetching session data');
    }

    if (sessionResult.length === 0) {
      return res.status(404).send('No active session found. Please sign in.');
    }

    const user_id = sessionResult[0].user_id;

    // Insert donation record with user_id from the latest session
    const query = 'INSERT INTO donations (user_id, name, phone, address, donationType, donationAmount) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [user_id, name, phone, address, donationType, donationAmount], (err, result) => {
      if (err) {
        console.error("Error inserting donation:", err);
        return res.status(500).send('Internal server error');
      }
      res.status(201).send('Donation received');
    });
  });
});


// Event registration route
// Event registration route with user_id from latest session
app.post("/events", (req, res) => {
  const { event, numberOfAttendees } = req.body;

  // Query to get the user_id from the most recent session
  const latestSessionQuery = `
    SELECT user_id
    FROM session
    ORDER BY sign_in_time DESC
    LIMIT 1
  `;

  db.query(latestSessionQuery, (err, sessionResult) => {
    if (err) {
      console.error("Error fetching latest session:", err);
      return res.status(500).send("Error registering event");
    }

    if (sessionResult.length === 0) {
      return res.status(404).send("No active session found. Please sign in.");
    }

    // Retrieve user_id from the latest session result
    const user_id = sessionResult[0].user_id;

    // Insert event record with user_id from the latest session
    const eventQuery = `
      INSERT INTO events (user_id, event, numberOfAttendees) 
      VALUES (?, ?, ?)
    `;

    db.query(eventQuery, [user_id, event, numberOfAttendees], (err, result) => {
      if (err) {
        console.error("Error inserting event data:", err);
        return res.status(500).send("Error registering event");
      }
      res.status(201).send("Event registration successful!");
    });
  });
});


// New Payments Route
// app.post('/api/payments', (req, res) => {
//   const { user_id, payment_method } = req.body;
//   // Here you may want to include additional payment details (amount, transaction_id, etc.)
  
//   const query = 'INSERT INTO payments (user_id, payment_method, payment_time) VALUES (?, ?, NOW())';
  
//   db.query(query, [user_id, payment_method], (err, result) => {
//     if (err) {
//       console.error("Error processing payment:", err);
//       return res.status(500).send('Error processing payment');
//     }
//     res.status(201).send('Payment processed successfully');
//   });
// });

app.post('/api/payments', (req, res) => {
  const { payment_method, totalAmount } = req.body;

  // Query to get the user_id from the most recent session
  const latestSessionQuery = `
    SELECT user_id
    FROM session
    ORDER BY sign_in_time DESC
    LIMIT 1
  `;

  db.query(latestSessionQuery, (err, sessionResult) => {
    if (err) {
      console.error("Error fetching latest session:", err);
      return res.status(500).send('Error processing payment');
    }

    if (sessionResult.length === 0) {
      return res.status(404).send('No active session found. Please sign in.');
    }

    // Retrieve user_id from the latest session result
    const user_id = sessionResult[0].user_id;

    // Insert payment record with user_id from the latest session
    const paymentQuery = `
      INSERT INTO payments (user_id, payment_method, totalAmount, payment_time) 
      VALUES (?, ?, ?, NOW())
    `;

    db.query(paymentQuery, [user_id, payment_method, totalAmount], (err, paymentResult) => {
      if (err) {
        console.error("Error processing payment:", err);
        return res.status(500).send('Error processing payment');
      }
      res.status(201).send('Payment processed successfully');
    });
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

app.post('/api/feedback', (req, res) => {
  const { rating, comments } = req.body;

  // Fetch user_id from the most recent session
  const latestSessionQuery = `
    SELECT user_id
    FROM session
    ORDER BY sign_in_time DESC
    LIMIT 1
  `;

  db.query(latestSessionQuery, (err, sessionResult) => {
    if (err) {
      console.error("Error fetching latest session:", err);
      return res.status(500).send('Error processing feedback');
    }

    if (sessionResult.length === 0) {
      return res.status(404).send('No active session found. Please sign in.');
    }

    // Retrieve user_id from the latest session result
    const user_id = sessionResult[0].user_id;

    // Insert feedback record with user_id from the latest session
    const feedbackQuery = `
      INSERT INTO feedback (user_id, rating, comments, timestamp) 
      VALUES (?, ?, ?, NOW())
    `;

    db.query(feedbackQuery, [user_id, rating, comments], (err, feedbackResult) => {
      if (err) {
        console.error("Error submitting feedback:", err);
        return res.status(500).send('Error submitting feedback');
      }
      res.status(201).send('Feedback submitted successfully');
    });
  });
});

app.put('/api/update-profile', (req, res) => {
  const { field, value } = req.body;

  // Query to get the user_id from the latest session
  const latestSessionQuery = `
    SELECT user_id
    FROM session
    ORDER BY sign_in_time DESC
    LIMIT 1
  `;

  db.query(latestSessionQuery, (err, sessionResult) => {
    if (err) {
      console.error("Error fetching latest session:", err);
      return res.status(500).send('Error updating profile');
    }

    if (sessionResult.length === 0) {
      return res.status(404).send('No active session found. Please sign in.');
    }

    const user_id = sessionResult[0].user_id;

    // Dynamic update query for the specified field
    const updateQuery = `UPDATE users SET ${field} = ? WHERE id = ?`;
    db.query(updateQuery, [value, user_id], (err, result) => {
      if (err) {
        console.error("Error updating profile:", err);
        return res.status(500).send('Error updating profile');
      }
      res.send('Profile updated successfully');
    });
  });
});



// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
