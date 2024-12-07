const Router = require("express");
const {
  createComment,
  getComment,
  editComment,
  deleteComment,
  getOnlyOnePostComments,
} = require("../Controller/commentController");
const commentRoute = Router();

commentRoute.post("/createComment", createComment);
commentRoute.get("/getComments", getComment);
commentRoute.post("/editComment", editComment);
commentRoute.post("/getOnlyOnePostComments", getOnlyOnePostComments);
commentRoute.delete("/deleteComment", deleteComment);

module.exports = commentRoute;
