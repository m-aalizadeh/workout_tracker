const Users = require("../models/Users");
const { validationResult } = require("express-validator");

exports.addUser = async (req, res) => {
  try {
    const { name, username, email, status, phoneNumber } = req.body;
    const errors = validationResult(req).array();
    if (errors.length) {
      return res.status(422).json({
        errorMessage: "User creation got failed!",
        oldInput: {
          name,
          username,
          email,
          status,
          phoneNumber,
        },
        validationErrors: errors,
      });
    }
    const newUser = new Users({
      name,
      username,
      email,
      status,
      phoneNumber,
    });
    await newUser.save();
    return res.status(200).json({
      message: "User Created Successfully",
      newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error creating user" });
  }
};

exports.getAllUsers = async ({ query = {} }, res) => {
  try {
    const { page = 0, limit = 5 } = query;
    const users = await Users.find({});
    // .limit(+limit)
    // .skip(+page * +limit);
    const count = await Users.countDocuments();
    return res.status(200).json({
      users,
      // totalPages: Math.ceil(count / limit),
      // currentPage: page,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error during fetching users " + err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { params = {}, body } = req;
  try {
    if (!Object.keys(body).length) {
      return res.status(400).json({ message: "There is no data to update" });
    }
    const user = await Users.findOne({ _id: params.id });
    const newData = {};
    Object.keys(body).forEach((field) => {
      if (body[field] !== user[field]) {
        newData[field] = body[field];
      }
    });
    if (!Object.keys(newData).length) {
      return res.status(400).json({ message: "Please modify the properties!" });
    }
    const newUser = await Users.findOneAndUpdate({ _id: params.id }, newData, {
      new: true,
    });
    return res.status(200).json({
      message: "Exercise updated Successfully!",
      newUser,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error during update exercise " + err.message });
  }
};

exports.deleteUser = async ({ params }, res) => {
  Users.findOneAndDelete({ _id: params.id })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({
          message: "No user data found with this id!",
          status: "error",
        });
      }
      res.json({ message: "User deleted successfully!", status: "success" });
    })
    .catch((err) => res.status(500).json(err));
};

exports.getUser = async ({ params }, res) => {
  Users.findOne({ _id: params.id })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({
          message: "No user data found with this id!",
          status: "error",
        });
      }
      res.json({ user: dbUserData, status: "success" });
    })
    .catch((err) => res.status(500).json(err));
};
