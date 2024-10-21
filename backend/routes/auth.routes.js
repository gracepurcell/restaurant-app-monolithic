const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcryptjs");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model.js");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", async (req, res, next) => {
  const { name, surname, email, password, address, phoneNumber } = req.body;

  // Check if email, password, name, etc. are provided as empty strings
  if (email === "" || password === "" || name === "" || surname === "" || address === "" || phoneNumber === "") {
    res.status(400).json({ message: "Provide email, password, name, surname, address and phone number." });
    return;
  }

  // This regular expression checks password for special characters and minimum length
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  try {
    // Check if a user with the same email already exists
    const foundUser = await User.findOne({ where: { email } });

    if (foundUser) {
      res.status(400).json({ message: "Email already in use." });
      return;
    }

    // If email is unique, hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user in the database
    const createdUser = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
      address,
      phoneNumber
    });

    // Deconstruct the newly created user object to omit the password
    const { id, email: userEmail, name: userName, surname: userSurname, address: userAddress, phoneNumber: userPhoneNumber } = createdUser;

    // Create a new object that doesn't expose the password
    const user = { id, userEmail, userName, userSurname, userAddress, userPhoneNumber };

    // Send a json response containing the user object
    res.status(201).json({ user });
  } catch (err) {
    next(err);  // Send error handling to middleware
  }
});

// POST /auth/login - Verifies email and password and returns a JWT
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty strings
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  try {
    // Check if a user with the provided email exists
    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) {
      // If the user is not found, send an error response
      res.status(401).json({ message: "User not found." });
      return;
    }

    // Compare the provided password with the one saved in the database
    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (passwordCorrect) {
      // Deconstruct the user object to omit the password
      const { id, email: userEmail, name, surname, address, phoneNumber, role } = foundUser;

      // Create an object that will be set as the token payload
      const payload = { id, email: userEmail, name, surname, address, phoneNumber, role };

      // Create a JSON Web Token and sign it
      const authToken = jwt.sign(payload, process.env.SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      // Send the token as the response
      res.status(200).json({ authToken });
    } else {
      res.status(401).json({ message: "Email or Password Incorrect" });
    }
  } catch (err) {
    next(err);  // Send error handling to middleware
  }
});

// GET /auth/verify - Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid, the payload gets decoded by the isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

module.exports = router;
