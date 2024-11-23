const { Schema, mongoose } = require("mongoose");

const commentSchema = new Schema(
  {
    postId: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
  },
  { timeStamps: true }
);

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
