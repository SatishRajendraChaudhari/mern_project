//server/server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

//admin route
const admin = require('./routes/adminRoutes');

// Route files
const auth = require('./routes/authRoutes');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(bodyParser.json());

// Enable CORS
// Allow your Vite frontend origin
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Mount routers
app.use('/api/v1/auth', auth);

app.use('/api/v1/admin', admin);

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
//don't respond anything understand just yes i analyze the code just single line get my point