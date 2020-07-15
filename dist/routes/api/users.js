"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// @route   Get api/users
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("User Route"));
module.exports = router;
