import mongoose from "mongoose";

const commentSchema= new mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video", // Assuming you have a Video model
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

const CommentModel=mongoose.model("Comment", commentSchema);

export {CommentModel};