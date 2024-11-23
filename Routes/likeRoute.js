const Router = require("express");
const { likePost, disableLike } = require("../Controller/likeController");
const likeRoute = Router();

likeRoute.post("/likePost", likePost);
likeRoute.delete("/unLike", disableLike);

module.exports = likeRoute;
