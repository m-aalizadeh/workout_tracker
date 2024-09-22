const express = require("express");
const { body, check } = require("express-validator");
const router = express.Router();
const {
  addExercise,
  getExerciseById,
  deleteExercise,
} = require("../controllers/exercise");
const { verifyToken } = require("../utils/isAuth");

router.use(verifyToken);
router.post(
  "/add",
  [
    body("type")
      .isString()
      .isLength({ min: 5, max: 15 })
      .withMessage(
        "Minimum length for type is 5, Maximum length for type is 15."
      )
      .trim(),
    body("name")
      .isString()
      .isLength({ min: 5, max: 25 })
      .withMessage(
        "Minimum length for name is 5, Maximum length for name is 15."
      )
      .trim(),
    body("duration").isNumeric().withMessage("Duration must be number").trim(),
    body("date").isDate().withMessage("Date format is invalid").trim(),
    check("userId").isMongoId().withMessage("UserId must only contain UUIDs."),
  ],
  addExercise
);

router.get("/:id", getExerciseById);
router.delete("/delete/:id", deleteExercise);

module.exports = router;
