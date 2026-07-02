// server.js
// Entry point for the Nutrition Assistant Express backend

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file into process.env
dotenv.config();

// Import the database connection function
const connectDB = require("./db/config");

// Import route modules
const userRoutes = require("./routes/userRoute");
const suggestionRoutes = require("./routes/suggestionRoute");

// ─── Initialize Express App ───────────────────────────────────────────────────
const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
// Allow CORS for all origins (update this in production to allow only your frontend URL)
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

// ─── Routes ───────────────────────────────────────────────────────────────────
// Mount user routes at /api/users
app.use("/api/users", userRoutes);

// Mount suggestion routes at /api/suggestions
app.use("/api/suggestions", suggestionRoutes);

// ─── Health Check Route ───────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "🥗 Nutrition Assistant API is running!" });
});

// ─── Global Error Handling Middleware ────────────────────────────────────────
// This must be defined AFTER all routes — Express identifies error middleware
// by its 4-parameter signature: (err, req, res, next)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
