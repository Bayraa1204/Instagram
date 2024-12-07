const Router = require("express");
const {
  createPost,
  getPosts,
  getOnlyOnePost,
  getPostComments,
} = require("../Controller/postController");
const postRoute = Router();

postRoute.post("/createPost", createPost);
postRoute.get("/getPost", getPosts);
postRoute.get("/post/:postId", getPostComments);
postRoute.post("/getOnlyOnePost", getOnlyOnePost);

module.exports = postRoute;
