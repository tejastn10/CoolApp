"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const User_model_1 = require("../../models/User.model");
const express_validator_1 = require("express-validator");
const authController_1 = require("../../controllers/authController");
const Error_1 = require("./../../global/Error");
const router = express_1.Router();
// @route   Get api/auth
// @desc    Test route
// @access  Public
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.User.findById(req.user.id).select("-password");
        res.json(user);
    }
    catch (err) {
        Error_1.LogErr(err, res);
    }
}));
// @route   Post api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post("/", [
    express_validator_1.check("email", "Please inlcude a valid Email!").isEmail(),
    express_validator_1.check("password", "Password is required").exists(),
], authController_1.auth_post);
module.exports = router;
