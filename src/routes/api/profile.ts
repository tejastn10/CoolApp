import { Router, Request, Response } from "express";
import auth from "../../middleware/auth";
import { check } from "express-validator";
import { prof_post, prof_user_get } from "../../controllers/profileController";

const router: Router = Router();

// @route   Get api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get(
  "/me",
  auth,
  prof_user_get,
);

// @route   Post api/profile
// @desc    Create or Update user's profile
// @access  Private
router.post(
  "/",
  auth,
  [
    check("jobstatus", "Job status is required").not().isEmpty(),
    check("hobbies", "Hobbies are required").not().isEmpty(),
  ],
  prof_post,
);

module.exports = router;
