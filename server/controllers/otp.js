const crypto = require("crypto");
const OTP = require("../models/OTP");
const { sendEmail } = require("../config/mailer");

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = generateOTP();
    const newOTP = new OTP({
      email,
      otp,
    });

    await newOTP.save();
    const subject = "Your One-Time Password (OTP)";
    const text = `Your OTP is:${otp}. It will expire in 3 minutes.`;
    await sendEmail(email, subject, text);
    res
      .status(200)
      .json({ status: "success", message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Failed to send OTP" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!otpRecord) {
      return res
        .status(400)
        .json({ status: "error", message: "OTP not found or expired" });
    } else if (otpRecord.otp !== otp) {
      return res.status(400).json({ status: "error", message: "Invalid OTP" });
    }
    await OTP.deleteOne({ _id: otpRecord._id });
    return res
      .status(200)
      .json({ status: "error", message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP" + error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to verify OTP" });
  }
};

module.exports = { sendOTP, verifyOTP };
