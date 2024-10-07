const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// MySQL connection setup
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// Question 1
// Create a GET route to retrieve all patients
// app.get('/patients', (req, res) => {
//     const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  
//     connection.query(query, (err, results) => {
//       if (err) {
//         console.error('Error retrieving patients:', err);
//         res.status(500).json({ error: 'Failed to retrieve patients' });
//       } else {
//         res.json(results); // Send all patients as JSON
//       }
//     });
//   });

// Question 2
// Create a GET route to retrieve all providers
// app.get('/providers', (req, res) => {
//     const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
  
//     connection.query(query, (err, results) => {
//       if (err) {
//         console.error('Error retrieving providers:', err);
//         res.status(500).json({ error: 'Failed to retrieve providers' });
//       } else {
//         res.json(results); // Send the providers as JSON
//       }
//     });
//   });
    // Question 3
  // Endpoint to retrieve patients by first name
// app.get('/patients', (req, res) => {
//     const firstName = req.query.first_name; // Get the first_name from query parameters
//     let query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    
//     // Check if first_name is provided
//     if (firstName) {
//       query += ' WHERE first_name = ?';
//     }
  
//     connection.query(query, [firstName], (err, results) => {
//       if (err) {
//         console.error('Error retrieving patients:', err);
//         return res.status(500).json({ error: 'Database query error' });
//       }
  
//       res.json(results);
//     });
//   });
  
// app.get('/providers', (req, res) => {
  // Endpoint to retrieve providers by specialty
app.get('/providers', (req, res) => {
    const specialty = req.query.specialty; // Get the specialty from query parameters
    let query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    
    // Check if specialty is provided
    if (specialty) {
      query += ' WHERE provider_specialty = ?';
    }
  
    connection.query(query, [specialty], (err, results) => {
      if (err) {
        console.error('Error retrieving providers:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
  
      res.json(results);
    });
  });

  // Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
