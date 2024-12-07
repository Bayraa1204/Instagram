const postModel = require("../Model/postSchema");
const userModel = require("../Model/userSchema");

const createPost = async (req, res) => {
  try {
    const { caption, postImg, userId } = req.body;
    const postCreate = await postModel.create({
      caption,
      postImg,
      userId,
    });
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        posts: postCreate._id,
      },
    });
    res.status(200).send(postCreate);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find().populate([
      { path: "userId", select: "username email profileImg" },
      { path: "like", select: "username email profileImg" },
      {
        path: "comments",
        select: "comment userId",
        populate: { path: "userId", select: "username email profileImg" },
      },
    ]);
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOnlyOnePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await postModel
      .findOne({ _id: postId })
      .populate("comments like", "userId comment");
    res.status(200).send(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getOnlyOnePostComments = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await postModel
      .findOne({ _id: postId })
      .populate("comments like", "userId comment");
    res.status(200).send(post.comments);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getOnlyOnePost,
  getOnlyOnePostComments,
};
