const Router = require("express");
const {
  signup,
  getUsers,
  followUser,
  unFollowUser,
  getOneUserInfo,
} = require("../Controller/userController");
const userRoute = Router();

userRoute.post("/signup", signup);
userRoute.get("/getUsers", getUsers);
userRoute.post("/getOneUserInfo", getOneUserInfo);
userRoute.post("/followUser", followUser);
userRoute.delete("/unFollowUser", unFollowUser);

module.exports = userRoute;
