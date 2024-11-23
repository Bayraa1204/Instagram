const postModel = require("../Model/postSchema");

const likePost = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    await postModel.findByIdAndUpdate(
      postId,
      {
        $addToSet: {
          like: userId,
        },
      },
      { new: true }
    );
    res.status(200).send("liked");
  } catch (error) {
    res.status(500).json(error);
  }
};
const disableLike = async (req, res) => {
  const { likeId, postId } = req.body;
  try {
    await postModel.findByIdAndUpdate(
      postId,
      {
        $pull: {
          like: likeId,
        },
      },
      { new: true }
    );
    res.status(200).send("unLiked");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { likePost, disableLike };
