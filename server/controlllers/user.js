const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  googleLogin: async (req, res) => {
    try {
      console.log("google login");
      const user = req.user;
      console.log("user",user)
      if (!user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.redirect(`http://localhost:5173/dashboard?token=${token}`);
      // res.status(200).json({ message: "Login successful",user, token });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  },

  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!(name && email && password))
        return res.status(400).json({ message: "all field is required" });
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "user already exist" });
      }
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // save user
      const newUser = await new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required." });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password." });
      }

      //compare password
      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        return res.status(400).json({ message: "Invalid email or password." });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  },
  users: async (req, res) => {
    try {
      const users = await User.find();
      if (users) {
        return res
          .status(200)
          .json({ message: "users got successfully", users });
      }
    } catch (error) {
      return res.status(404).json({ message: "something went wrong" });
    }
  },
};

module.exports = userController;
