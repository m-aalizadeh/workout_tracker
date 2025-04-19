const { Schema, model } = require("mongoose");

const OTPSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 180, // 3 minutes
  },
});

module.exports = model("OTP", OTPSchema);
