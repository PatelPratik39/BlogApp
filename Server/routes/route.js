import express from "express";
import { signupUser, loginUser } from "../controller/userController.js";
import { uploadImage, getImage } from "../controller/imageController.js";
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost
} from "../controller/postController.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import upload from "../utils/upload.js";
import {
  newComment,
  getComments,
  deleteComment
} from "../controller/comment-controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

// upload.single("file") is ,middleware here that is most important method we need here,
//  before hit on API call it has to passed through middleware
router.post("/file/upload", upload.single("file"), uploadImage);

// getImage from mongodb
router.get("/file/:filename", getImage);

// cratePost
router.post("/create", authenticateToken, createPost);
// getPots
router.get("/posts", authenticateToken, getAllPosts);
// getPost by ID
router.get("/post/:id", authenticateToken, getPost);

// PUT API
router.put("/update/:id", authenticateToken, updatePost);

// DELETE API route
router.delete("/delete/:id", authenticateToken, deletePost);

// POST New Comments API route
router.post("/comment/new", authenticateToken, newComment);

// GET ALL Comments API route
// router.get("/comments", authenticateToken, getComments);
router.get("/comments/:id", authenticateToken, getComments);

// DELETE COMMENT ROUTE
router.delete("/comment/delete/:id", authenticateToken, deleteComment);

export default router;
