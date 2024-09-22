const User = require("../models/User");
const Exercise = require("../models/Exercise");
const { validationResult } = require("express-validator");

exports.addExercise = async (req, res) => {
  const errors = validationResult(req).array();
  const { body } = req;
  if (errors.length) {
    return res.status(422).json({
      exercise: body,
      errorMessage: "Exercise creation got failed!",
      validationErrors: errors,
    });
  }
  Exercise.create(body)
    .then((dbExerciseData) => {
      return User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { exercise: dbExerciseData._id } },
        { new: true }
      );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({
          message: "Exercise created but there is no user with this id!",
        });
      }
      res.json({ message: "Exercise created successfully!" });
    })
    .catch((err) => err.status(500).json(err));
};

exports.getExerciseById = async ({ params }, res) => {
  Exercise.findOne({ _id: params.id })
    .then((dbExerciseData) => {
      if (!dbExerciseData) {
        return res
          .status(404)
          .json({ message: "No exercise data found with this id!" });
      }
      res.json(dbExerciseData);
    })
    .catch((err) => res.status(500).json(err));
};

exports.deleteExercise = async ({ params }, res) => {
  Exercise.findOneAndDelete({ _id: params.id })
    .then((dbExerciseData) => {
      if (!dbExerciseData) {
        return res
          .status(404)
          .json({ message: "No exercise data found with this id!" });
      }
      return User.findOneAndUpdate(
        { exercise: params.id },
        { $pull: { exercise: params.id } },
        { new: true }
      );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({
          message: "Exercise deleted but there is no user with this id!",
        });
      }
      res.json({ message: "Exercise deleted successfully!" });
    })
    .catch((err) => res.status(500).json(err));
};
