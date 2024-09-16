const bcrypt = require("bcrypt");
const User = require("../models/User");
const { signToken } = require("../utils/isAuth");

exports.signUp = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please Input Username and Password" });
    }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
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

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please Input username and password" });
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
