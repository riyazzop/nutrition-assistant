// middlewares/authMiddleware.js
// Middleware to protect routes — verifies JWT and attaches user info to req

const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * protect - Express middleware that:
 *   1. Reads the Authorization header ("Bearer <token>")
 *   2. Verifies the JWT using JWT_SECRET
 *   3. Fetches the user from the database and attaches them to req.user
 *   4. Returns 401 if the token is missing or invalid
 */
const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token part after "Bearer "
      token = req.headers.authorization.split(" ")[1];

      // Verify the token — throws an error if invalid or expired
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from DB using the ID embedded in the token
      // We exclude the password from the result for security
      req.user = await User.findById(decoded.id).select("-password");

      // Proceed to the next middleware / route handler
      next();
    } catch (error) {
      console.error("Auth middleware error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token was found in the header
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
