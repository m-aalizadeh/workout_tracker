const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const { signToken } = require("../utils/isAuth");

exports.signUp = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const errors = validationResult(req).array();
    if (errors.length) {
      return res.status(422).json({
        errorMessage: "User creation got failed!",
        oldInput: {
          email,
          username,
          role,
        },
        validationErrors: errors,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return res.status(200).json({
      message: "User Created Successfully",
      token: signToken({ username, userId: newUser._id.toString() }),
      newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error creating user" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const errors = validationResult(req).array();
    if (errors.length) {
      return res.status(422).json({
        errorMessage: "User signin got failed!",
        validationErrors: errors,
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = signToken({ username, userId: user._id.toString() });
    return res.status(200).json({
      message: "User signed in successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error during signin" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error during fetching users " });
  }
};

exports.validateToken = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ status: "success", message: "Token is valid" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Error during fetching users " });
  }
};
