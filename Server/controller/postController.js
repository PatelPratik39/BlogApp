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
      posts = await Post.find({ categories : category });
    } else {
      posts = await Post.find({});
    }
    return response.status(200).json(posts);
  } catch (error) {
    return response.status(500).json({ message: error.message }); // Corrected typo in error handling
  }
};
