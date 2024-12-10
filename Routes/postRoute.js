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
postRoute.post("/getOnlyOnePost", getOnlyOnePost);
postRoute.get("/:idPost", getPostComments);

module.exports = postRoute;
