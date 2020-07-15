"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
// @route   Get api/auth
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Auth Route"));
module.exports = router;
