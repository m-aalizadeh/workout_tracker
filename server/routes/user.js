const express = require("express");
const { check, body } = require("express-validator");
const User = require("../models/User");
const { signUp, signin, getAllUsers } = require("../controllers/user");
const { verifyToken } = require("../utils/isAuth");
const router = express.Router();

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body("username")
      .isString()
      .withMessage("Username must be string!")
      .isLength({ min: 5, max: 20 })
      .withMessage(
        "Minimum length for username is 5, Maximum length for username is 20."
      )
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Username exists already, please pick a different one."
            );
          }
        });
      })
      .trim(),
    body("password")
      .isLength({ min: 5, max: 15 })
      .withMessage(
        "Minimum length for password is 5, Maximum length for password is 15."
      )
      .isAlphanumeric()
      .trim(),
  ],
  signUp
);

router.post(
  "/signin",
  [
    body("username").isString().withMessage("Username must be string!").trim(),
    body("password")
      .isLength({ min: 5, max: 15 })
      .withMessage(
        "Minimum length for password is 5, Maximum length for password is 15."
      )
      .isAlphanumeric()
      .trim(),
  ],
  signin
);
router.get("/allUsers", verifyToken, getAllUsers);

module.exports = router;
