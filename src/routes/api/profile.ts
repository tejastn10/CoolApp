import { Router } from "express";
import auth from "../../middleware/auth";
import { check } from "express-validator";
import {
  prof_post,
  prof_user_get,
  users_get,
  user_id_get,
  del_user,
} from "../../controllers/profileController";

const router: Router = Router();

// * Searching users

// @route   Get api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", users_get);

// @route   Get api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id", user_id_get);

// ? Relating to specific user

// @route   Get api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, prof_user_get);

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
  prof_post
);

// ! Deleting user profile

// @route   Delete api/profile
// @desc    Delete profile, user and posts
// @access  Private
router.delete("/", auth, del_user);

module.exports = router;
