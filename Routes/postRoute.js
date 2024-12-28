const Router = require("express");
const {
  createPost,
  getPosts,
  getOnlyOnePost,
  getPostComments,
} = require("../Controller/postController");
const authMiddleware = require("../authMiddleware");
const postRoute = Router();

postRoute.post("/createPost", authMiddleware, createPost);
postRoute.get("/getPost", authMiddleware, getPosts);
postRoute.get("/getOnlyOnePost/:postId", authMiddleware, getOnlyOnePost);
postRoute.get("/:idPost", authMiddleware, getPostComments);

module.exports = postRoute;
