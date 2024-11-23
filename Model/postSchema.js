const { Schema, mongoose } = require("mongoose");

const postSchema = new Schema(
  {
    caption: { type: String, required: true },
    postImg: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    like: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timeStamps: true }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
