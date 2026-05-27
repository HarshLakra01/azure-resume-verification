const express = require("express");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");


// REGISTER API
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "Email already registered",
      });

    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create New User
    const newUser = new User({

      name,
      email,
      password: hashedPassword,

    });

    // Save To Database
    await newUser.save();

    res.json({
      message: "User Registered Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

// LOGIN API
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User Not Found",
      });

    }

    // Compare Password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });

    }

    // Generate JWT
    const token = jwt.sign(

      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      }

    );

    res.json({

      message: "Login Successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});



module.exports = router;