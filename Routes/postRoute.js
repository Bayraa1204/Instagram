const Router = require("express");
const {
  createPost,
  getPosts,
  getOnlyOnePost,
  getOnlyOnePostComments,
} = require("../Controller/postController");
const postRoute = Router();

postRoute.post("/createPost", createPost);
postRoute.get("/getPost", getPosts);
postRoute.post("/getOnlyOnePost", getOnlyOnePost);
postRoute.post("/getOnlyOnePostComments", getOnlyOnePostComments);

module.exports = postRoute;
