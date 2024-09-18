const User = require("../models/User");
const Exercise = require("../models/Exercise");
const { validationResult } = require("express-validator");

exports.addExercise = async (req, res) => {
  const errors = validationResult(req);
  const { body } = req;
  if (!errors.isEmpty()) {
    return res.status(422).render("exercise/add", {
      pageTitle: "Add Exercise",
      path: "exercise/add",
      editing: false,
      hasError: true,
      product: body,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  Exercise.create(body)
    .then((dbExerciseData) => {
      return User.findOneAndDelete(
        { _id: body.userId },
        { $push: { exercise: dbExerciseData._id } },
        { new: true }
      );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res
          .status(404)
          .json({ message: "Exercise created but no user with this id!" });
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
        return res
          .status(404)
          .json({ message: "Exercise deleted but no user with this id!" });
      }
      res.json({ message: "Exercise deleted successfully!" });
    })
    .catch((err) => res.status(500).json(err));
};
