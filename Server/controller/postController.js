import Post from "../models/Post.js";

// Create Post API
export const createPost = async (request, response) => {
  try {
    // const post = new Post(request.body);
    const post = new Post({
      ...request.body,
      username: request.user.username
    });
    await post.save(); // Corrected to await the save operation
    console.log(post);
    return response.status(200).json("Post saved Successfully");
  } catch (error) {
    console.error("Error fetching posts:", error);
    return response.status(500).json(error);
  }
};

// getAllPosts API
export const getAllPosts = async (request, response) => {
  let category = request.query.category;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find({});
    }
    return response.status(200).json(posts);
  } catch (error) {
    return response.status(500).json({ message: error.message }); // Corrected typo in error handling
  }
};

// get Post by ID

export const getPost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    return response.status(200).json(post);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

// Update Post API
/*
first I need to get post from database,
second i need to update the post
third send the post back to database

*/
export const updatePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id); //first I need to get post from database,
    if (!post) {
      return response.status(404).json({ message: "Post not found" });
    }
    await Post.findByIdAndUpdate(request.params.id, { $set: request.body }); // $set, and $addtoSet
    return response.status(200).json({ message: "Post UPDATED Successfully" });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};


// Delete POST API

export const deletePost = async(request, response) => {
  try{
    const postId = request.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return response.status(404).json({ message: "Post not found" });
    }
    await Post.findByIdAndDelete(postId);
    return response.status(200).json({ message: "Post DELETED Successfully" });
  }catch(error){
    return response.status(500).json({ message: error.message });
  }
}