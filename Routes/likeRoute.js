const Router = require("express");
const { likePost, disableLike } = require("../Controller/likeController");
const authMiddleware = require("../authMiddleware");
const likeRoute = Router();

likeRoute.post("/likePost", authMiddleware, likePost);
likeRoute.delete("/unLike", authMiddleware, disableLike);

module.exports = likeRoute;
