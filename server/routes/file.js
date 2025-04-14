const express = require("express");
const multer = require("multer");
const { uploadFile, getFile } = require("../controllers/file");
const { verifyToken } = require("../utils/isAuth");
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 16 * 1024 * 1024,
  },
});
router.use(verifyToken);
router.post("/uploadFile/:userId", upload.single("file"), uploadFile);
router.get("/getFile/:userId", getFile);

module.exports = router;
