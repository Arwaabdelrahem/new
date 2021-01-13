const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decode = jwt.verify(token, config.get("jwtprivateKey"));
    req.user = decode;
    if (req.user.kind == "Admin") next();
  } catch (error) {
    return res.status(403).send("Access denied.");
  }
};
