const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ status: "error", message: "Token is not available" });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Token is not valid!" });
  }
};

exports.signToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY || "1234!@#%<{*&)", {
    expiresIn: process.env.JWT_EXPIRE || "1d",
  });
};
