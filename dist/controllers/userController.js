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
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_post = void 0;
const User_model_1 = require("../models/User.model");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = require("bcryptjs");
const gravatar_1 = require("gravatar");
const jsonwebtoken_1 = require("jsonwebtoken");
const Error_1 = require("./../global/Error");
exports.user_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        // ? See if user exists
        let user = yield User_model_1.User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }
        // * Get User gravatar
        const avatar = gravatar_1.url(email, {
            s: "200",
            r: "pg",
            d: "mm",
        });
        user = new User_model_1.User({
            name,
            email,
            avatar,
            password,
        });
        // * Encrypt password
        const salt = yield bcryptjs_1.genSalt(10);
        user.password = yield bcryptjs_1.hash(password, salt);
        yield user.save();
        // * Return JSON WebToken
        const payload = {
            user: {
                id: user.id,
            },
        };
        jsonwebtoken_1.sign(payload, process.env["jwtSecret"], {
            expiresIn: 360000,
        }, (err, token) => {
            if (err)
                throw err;
            res.json({ token });
        });
    }
    catch (err) {
        Error_1.LogErr(err, res);
    }
});
