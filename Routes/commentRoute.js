const Router = require("express");
const {
  createComment,
  getComment,
  editComment,
  deleteComment,
  getOnlyOnePostComments,
} = require("../Controller/commentController");
const authMiddleware = require("../authMiddleware");
const commentRoute = Router();

commentRoute.post("/createComment", authMiddleware, createComment);
commentRoute.get("/getComments", authMiddleware, getComment);
commentRoute.post("/editComment", authMiddleware, editComment);
commentRoute.post(
  "/getOnlyOnePostComments",
  authMiddleware,
  getOnlyOnePostComments
);
commentRoute.delete("/deleteComment", authMiddleware, deleteComment);

module.exports = commentRoute;
