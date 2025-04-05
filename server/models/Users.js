const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: "Name is required",
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: "Username is required",
  },
  email: { type: String, unique: true, match: [/.+@.+\..+/] },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  phoneNumber: {
    type: String,
    trim: true,
    unique: true,
    required: "Phone number is required",
    match: [/^\d{10}$/],
  },
});

const Users = model("Users", usersSchema);

module.exports = Users;
