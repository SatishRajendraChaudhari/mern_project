//server/server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Route files
const auth = require('./routes/authRoutes');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
//i am sharing my all important components after sharing all the components than after that i can give you command get the point just now consume and understand the components till then don't do anything
// just analyze the code don't give me any response