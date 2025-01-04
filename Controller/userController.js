const bcrypt = require("bcrypt");
const userModel = require("../Model/userSchema");
const jwt = require("jsonwebtoken");
const { path } = require("../Routes/userRoute");
const { populate } = require("dotenv");

const signup = async (req, res) => {
  try {
    const { username, password, email, profileImg } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 5);
    const newUser = {
      username,
      password: hashedPassword,
      email,
      profileImg,
    };
    const response = await userModel.create(newUser);
    const token = jwt.sign({ userId: response._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.send({
      token,
    });
  } catch (error) {
    console.log(error);
    res.send(`error => ${error}`);
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const itIsValidPass = await bcrypt.compare(password, user.password);
    if (!user) {
      res.status(400).send({ message: "User Not Found" });
    }
    if (!itIsValidPass) {
      res.status(400).send({ message: "The password or email doesn't match" });
    }
    if (user && itIsValidPass) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      res.send({ token });
    }
  } catch (error) {
    res.send(error);
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
  const _id = req.userId;
  const { userId } = req.body;
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
  const _id = req.userId;
  const { userId } = req.body;
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
  const { idPost } = req.params;
  try {
    const response = await userModel.findOne({ _id: idPost }).populate([
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
      {
        path: "followers",
        populate: {
          path: "_id",
        },
      },
      {
        path: "following",
        populate: {
          path: "_id",
        },
      },
    ]);
    res.send(response);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  signup,
  getUsers,
  followUser,
  unFollowUser,
  getOneUserInfo,
  logIn,
};
