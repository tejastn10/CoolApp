import { Router } from "express";
import auth from "../../middleware/auth";
import { check } from "express-validator";
import {
  post_post,
  get_post,
  get_postbyid,
  del_postbyid,
  put_like,
  put_unlike,
  post_comment,
  del_comment,
} from "../../controllers/postController";

const router: Router = Router();

// @route   Post api/posts
// @desc    Create a Post
// @access  Private
router.post(
  "/",
  auth,
  [
    check("desc", "Description is required").not().isEmpty(),
    check("image", "Image is required").not().isEmpty(),
  ],
  post_post
);

// @route   Get api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, get_post);

// @route   Get api/posts/:id
// @desc    Get post by id
// @access  Private
router.get("/:id", auth, get_postbyid);

// @route   Delete api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete("/:id", auth, del_postbyid);

// @route   Put api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", auth, put_like);

// @route   Put api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put("/unlike/:id", auth, put_unlike);

// @route   Post api/posts/comment/:id
// @desc    Comment on a Post
// @access  Private
router.post(
  "/comment/:id",
  auth,
  [check("text", "Text is required").not().isEmpty()],
  post_comment
);

// @route   Delete api/posts/comment/:id/:comment_id
// @desc    Delete a Comment of a Post
// @access  Private
router.delete("/comment/:id/:comment_id", auth, del_comment);

module.exports = router;
