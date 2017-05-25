const express = require('express');
const path    = require('path');
const bodyParser = require('body-parser');
const cors    = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database Error: '+err);
});

// Initialize Express
const app = express();

// Users
const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static File
app.use(express.static(path.join(__dirname, 'public')));

//
app.use('/users',users);

// Body Parser Middleware
app.use(bodyParser.json());

// Index Router
app.get('/',(req,res) => {
  res.send("HOMEPAGE");
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
