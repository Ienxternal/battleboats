const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator'); // Import express-validator
const User = require('../models/UserModel');

// Helper function to create a JWT token
function createToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}

const authController = {
  signup: async (req, res) => {
    // Validate the request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(440).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }

      // Hash the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the user in the database
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      // Create a JWT token for the user
      const token = createToken(newUser);

      // Send the token and user data as response
      res.status(201).json({ token, user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create a JWT token for the user
      const token = createToken(user);

      // Send the token and user data as response
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  },
};

module.exports = authController;
