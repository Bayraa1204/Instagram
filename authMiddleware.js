const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) res.send({ message: "authHeader not found" });
  const token = authHeader.split(" ")[1];
  if (!token) res.send({ message: "token not found" });
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    res.send("Invalid token");
  } else {
    req.body.userId = decodedToken.userId;
    next();
  }
};

module.exports = authMiddleware;
