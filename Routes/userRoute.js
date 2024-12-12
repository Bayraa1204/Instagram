const Router = require("express");
const {
  signup,
  getUsers,
  followUser,
  unFollowUser,
  getOneUserInfo,
  logIn,
} = require("../Controller/userController");
const authMiddleware = require("../authMiddleware");
const userRoute = Router();

userRoute.post("/signup", signup)
userRoute.post("/logIn", logIn);;
userRoute.get("/getUsers", authMiddleware, getUsers);
userRoute.post("/getOneUserInfo", authMiddleware, getOneUserInfo);
userRoute.post("/followUser", authMiddleware, followUser);
userRoute.delete("/unFollowUser", authMiddleware, unFollowUser);

module.exports = userRoute;
