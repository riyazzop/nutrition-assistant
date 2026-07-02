// controllers/userController.js
// Handles user registration, login, and profile retrieval

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ─── Helper: Generate JWT ─────────────────────────────────────────────────────
/**
 * generateToken - Creates a signed JWT token containing the user's ID.
 * The token expires in 7 days.
 *
 * @param {string} id - MongoDB ObjectId of the user
 * @returns {string} Signed JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ─── Controller: Register User ────────────────────────────────────────────────
/**
 * @route   POST /api/users/register
 * @access  Public
 * @desc    Validates input, checks for duplicate email, creates user, returns JWT
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Basic input validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide name, email, and password" });
  }

  try {
    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create a new User document — the pre-save hook will hash the password
    const user = await User.create({ name, email, password });

    // Return user info and a JWT token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ─── Controller: Login User ───────────────────────────────────────────────────
/**
 * @route   POST /api/users/login
 * @access  Public
 * @desc    Validates credentials, compares password hash, returns JWT
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Use the instance method defined on the User model to compare passwords
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Return user info and a JWT token
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ─── Controller: Get User Profile ────────────────────────────────────────────
/**
 * @route   GET /api/users/profile
 * @access  Protected (requires JWT)
 * @desc    Returns the currently logged-in user's profile data
 */
const getUserProfile = async (req, res) => {
  try {
    // req.user is attached by the authMiddleware after verifying the JWT
    // We already excluded the password in the middleware, so this is safe to send
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
