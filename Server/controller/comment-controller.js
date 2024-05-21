import Comment from "../models/Comment.js";

// create new API that is newComment genrate

export const newComment = async (request, response) => {
  try {
    const comment = await new Comment(request.body); // Correct instantiation
    comment.save(); // Await the save operation
    response.status(200).json({ message: "Comment Saved Successfully!!" });
  } catch (error) {
    response.status(500).json({ error: response.error });
  }
};

// Get all commnets
// i need to get all the comments fdorm mongodb to UI using postId that is req.params.id from Comment Model.
// after that i want to send all comments to the UI

export const getComments = async (request, response) => {
  try {
    const comments = await Comment.find({ postId: request.params.id });
    response.status(200).json(comments);
  } catch (error) {
    response.status(500).json({ error: message.error });
  }
};

// DELET Commment
// i need to get a comment through Id from db using findById method,
//  i need to delet and send success message

export const deleteComment = async (request, response) => {
  try {
    const commentId = request.params.id;
    const comment = await Comment.findByIdAndDelete(commentId);
    console.log(comment);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    response.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    response
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
