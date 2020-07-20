"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const userController_1 = require("../../controllers/userController");
const router = express_1.Router();
// @route   Post api/users
// @desc    Register user
// @access  Public
router.post("/", [
    express_validator_1.check("name", "Name is required!").not().isEmpty(),
    express_validator_1.check("email", "Please inlcude a valid Email!").isEmail(),
    express_validator_1.check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
], userController_1.user_post);
module.exports = router;
