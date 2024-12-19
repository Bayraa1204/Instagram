const postModel = require("../Model/postSchema");

const likePost = async (req, res) => {
  const userId = req.userId;
  const postId = req.body;
  try {
    const response = await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        like: userId,
      },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
const disableLike = async (req, res) => {
  const userId = req.userId;
  const postId = req.body;
  try {
    await postModel.findByIdAndUpdate(postId, {
      $pull: {
        like: userId,
      },
    });
    res.status(200).send("unLiked");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { likePost, disableLike };
