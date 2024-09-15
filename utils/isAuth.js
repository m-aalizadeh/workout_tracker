const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error Validating Token" });
  }
};

exports.signToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY || "1234!@#%<{*&)", {
    expiresIn: "1h",
  });
};
