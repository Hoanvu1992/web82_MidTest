import mongoose from "mongoose";
import Collections from "../database/collection.js";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const PostModel = mongoose.model(Collections.posts, postSchema);

export default PostModel;
