// db/config.js
// Handles the MongoDB connection using Mongoose

const mongoose = require("mongoose");

/**
 * connectDB - Connects to MongoDB using the MONGO_URI from environment variables.
 * Call this function once when the server starts.
 */
const connectDB = async () => {
  try {
    // Attempt to connect using the URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit the process if the database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
