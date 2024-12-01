const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB URI from the .env file
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB (updated)
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Export mongoose for use in other files if needed
module.exports = mongoose;



