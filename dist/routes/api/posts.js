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
module.exports = router;
