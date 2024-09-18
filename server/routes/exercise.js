const express = require("express");
const { body, param } = require("express-validator");
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
      .isLength({ min: 7, max: 15 })
      .withMessage(
        "Minimum length for type is 7, Maximum length for type is 15."
      )
      .trim(),
    body("name")
      .isString()
      .isLength({ min: 10, max: 25 })
      .withMessage(
        "Minimum length for name is 7, Maximum length for name is 15."
      )
      .trim(),
    body("duration").isNumeric().withMessage("Duration must be number").trim(),
    body("date").isISO8601().withMessage("Date format is invalid").trim(),
    body("userId").isUUID().withMessage("UserId must only contain UUIDs."),
  ],
  addExercise
);

router.get(
  "/:id",
  param("id").notEmpty().withMessage("Id is missed in params"),
  getExerciseById
);

router.delete(
  "/delete/:id",
  param("id").notEmpty().withMessage("Id is missed in params"),
  deleteExercise
);

module.exports = router;
