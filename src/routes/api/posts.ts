import { Router } from "express";
import auth from "../../middleware/auth";
import { check } from "express-validator";
import {
  post_post,
  get_post,
  get_postbyid,
  del_postbyid,
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

module.exports = router;
