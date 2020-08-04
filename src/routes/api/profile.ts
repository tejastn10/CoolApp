import { Router } from "express";
import auth from "../../middleware/auth";
import { check } from "express-validator";
import {
  prof_post,
  prof_user_get,
  users_get,
  user_id_get,
  del_user,
  put_holidays,
  del_holidays,
  put_edu,
  del_edu,
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
  prof_post,
);

// ? Holidays

// @route   Put api/profile/holidays
// @desc    Add holidays
// @access  Private
router.put(
  "/holidays",
  auth,
  [
    check("title", "Title is required").not().isEmpty(),
    check("location", "Location is required").not().isEmpty(),
    check("from", "From is required").not().isEmpty(),
  ],
  put_holidays,
);

// @route   Delete api/profile/holidays/:holi_id
// @desc    Delete Holidays
// @access  Private
router.delete("/holidays/:holi_id", auth, del_holidays);

// ? Education

// @route   Put api/profile/education
// @desc    Add Education
// @access  Private
router.put(
  "/education",
  auth,
  [
    check("school", "School is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("fieldofstudy", "Field of Study is required").not().isEmpty(),
    check("from", "From is required").not().isEmpty(),
  ],
  put_edu,
);

// @route   Delete api/profile/education/:edu_id
// @desc    Delete Education
// @access  Private
router.delete("/education/:edu_id", auth, del_edu);

// ! Deleting user profile

// @route   Delete api/profile
// @desc    Delete profile, user and posts
// @access  Private
router.delete("/", auth, del_user);

module.exports = router;
