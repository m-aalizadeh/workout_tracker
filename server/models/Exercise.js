const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  type: { type: String, required: "Type is required" },
  name: { type: String, required: "Name is required", maxLength: 30 },
  duration: { type: Number, required: "Duration is required" },
  date: { type: Date, required: "Date is required" },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "UserID is required",
  },
});

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
