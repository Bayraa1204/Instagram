const bcrypt = require("bcrypt");
const userModel = require("../Model/userSchema");
const postModel = require("../Model/postSchema");

const signup = async (req, res) => {
  try {
    const { username, password, email, profileImg } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 5);
    const newUserBody = {
      username,
      password: hashedPassword,
      email,
      profileImg,
    };
    const response = await userModel.create(newUserBody);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(`error => ${error}`);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate("posts", "caption postImg");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const followUser = async (req, res) => {
  const { userId, _id } = req.body;
  try {
    await userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          followers: _id,
        },
      },
      { new: true }
    );
    await userModel.findByIdAndUpdate(
      _id,
      {
        $addToSet: {
          following: userId,
        },
      },
      { new: true }
    );
    res.status(200).send("Updated");
  } catch (error) {
    res.status(500).send(error);
  }
};

const unFollowUser = async (req, res) => {
  const { userId, _id } = req.body;
  const isFollowing = await userModel.find({ _id: _id, following: userId });
  if (isFollowing) {
    try {
      await userModel.findByIdAndUpdate(
        userId,
        {
          $pull: {
            followers: _id,
          },
        },
        { new: true }
      );
      await userModel.findByIdAndUpdate(
        _id,
        {
          $pull: {
            following: userId,
          },
        },
        { new: true }
      );
      res.status(200).send("done");
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).send("User is not following this person");
  }
};
const getOneUserInfo = async (req, res) => {
  const body = req.body;
  try {
    const response = await userModel.findOne({ _id: body.userId }).populate([
      {
        path: "posts",
        populate: [
          { path: "userId", select: "username email profileImg" },
          { path: "like", select: "username email profileImg" },
          {
            path: "comments",
            select: "comment userId",
            populate: { path: "userId", select: "username email profileImg" },
          },
        ],
      },
    ]);
    res.send(response);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { signup, getUsers, followUser, unFollowUser, getOneUserInfo };
