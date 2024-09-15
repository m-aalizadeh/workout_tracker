const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true, maxLength: 30 },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
