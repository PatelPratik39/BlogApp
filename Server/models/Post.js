import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: false
    },
    categories: {
      type: Array,
      required: false
    },
    createdDate: {
      type:Date,
      required: true
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
