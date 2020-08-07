import { Router } from "express";
import auth from "../../middleware/auth";
import { check } from "express-validator";
import { post_post } from "../../controllers/postController";

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

module.exports = router;
