const Router = require("express");
const {
  createPost,
  getPosts,
  getOnlyOnePost,
} = require("../Controller/postController");
const postRoute = Router();

postRoute.post("/createPost", createPost);
postRoute.get("/getPost", getPosts);
postRoute.post("/getOnlyOnePost", getOnlyOnePost);

module.exports = postRoute;
