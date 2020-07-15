"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// @route   Get api/posts
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Posts Route"));
module.exports = router;
