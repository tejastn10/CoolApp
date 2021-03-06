"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const express_validator_1 = require("express-validator");
const profileController_1 = require("../../controllers/profileController");
const router = express_1.Router();
// * Searching users
// @route   Get api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", profileController_1.users_get);
// @route   Get api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id", profileController_1.user_id_get);
// ? Relating to specific user
// @route   Get api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth_1.default, profileController_1.prof_user_get);
// @route   Post api/profile
// @desc    Create or Update user's profile
// @access  Private
router.post("/", auth_1.default, [
    express_validator_1.check("jobstatus", "Job status is required").not().isEmpty(),
    express_validator_1.check("hobbies", "Hobbies are required").not().isEmpty(),
], profileController_1.prof_post);
// ! Deleting user profile
// @route   Delete api/profile
// @desc    Delete profile, user and posts
// @access  Private
router.delete("/", auth_1.default, profileController_1.del_user);
module.exports = router;
