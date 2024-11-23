const Router = require("express");
const {
  createComment,
  getComment,
  editComment,
  deleteComment,
} = require("../Controller/commentController");
const commentRoute = Router();

commentRoute.post("/createComment", createComment);
commentRoute.get("/getComments", getComment);
commentRoute.post("/editComment", editComment);
commentRoute.delete("/deleteComment", deleteComment);

module.exports = commentRoute;
