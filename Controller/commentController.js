const commentModel = require("../Model/commentSchema");
const postModel = require("../Model/postSchema");

const createComment = async (req, res) => {
  try {
    const { userId, postId, comment } = req.body;
    const commentCreate = await commentModel.create({
      userId,
      postId,
      comment,
    });
    await postModel.findByIdAndUpdate(postId, {
      $push: {
        comments: commentCreate._id,
      },
    });
    res.status(200).send(commentCreate);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getComment = async (req, res) => {
  try {
    const comments = await commentModel
      .find()
      .populate(
        "postId userId",
        "caption postImg userId email username profileImg"
      );
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getOnlyOnePostComments = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await commentModel
      .find({ postId: postId })
      .populate("userId", "username profileImg");
    res.status(200).send(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

const editComment = async (req, res) => {
  const { commentId, comment } = req.body;
  try {
    const updateComment = await commentModel.findByIdAndUpdate(
      commentId,
      {
        comment: comment,
      },
      { new: true }
    );
    res.status(200).send(updateComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId, postId } = req.body;
    await commentModel.findByIdAndDelete(commentId);
    await postModel.findByIdAndUpdate(postId, {
      $pull: {
        comments: commentId,
      },
    });
    res.status(200).send("done");
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  createComment,
  getComment,
  editComment,
  deleteComment,
  getOnlyOnePostComments,
};
