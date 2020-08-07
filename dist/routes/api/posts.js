"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const express_validator_1 = require("express-validator");
const postController_1 = require("../../controllers/postController");
const router = express_1.Router();
// @route   Post api/posts
// @desc    Create a Post
// @access  Private
router.post("/", auth_1.default, [
    express_validator_1.check("desc", "Description is required").not().isEmpty(),
    express_validator_1.check("image", "Image is required").not().isEmpty(),
], postController_1.post_post);
// @route   Get api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth_1.default, postController_1.get_post);
// @route   Get api/posts/:id
// @desc    Get post by id
// @access  Private
router.get("/:id", auth_1.default, postController_1.get_postbyid);
// @route   Delete api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete("/:id", auth_1.default, postController_1.del_postbyid);
module.exports = router;
