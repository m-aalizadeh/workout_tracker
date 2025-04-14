const multer = require("multer");

const storage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 16 * 1024 * 1024,
  },
});

exports.upload = multer({ storage });
