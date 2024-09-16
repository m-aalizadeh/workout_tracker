const express = require("express");
const { signUp, signin, getAllUsers } = require("../controllers/user");
const { verifyToken } = require("../utils/isAuth");
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signin);
router.get("/allUsers", verifyToken, getAllUsers);

module.exports = router;
