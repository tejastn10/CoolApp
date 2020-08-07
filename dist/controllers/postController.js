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
exports.post_post = void 0;
const User_model_1 = require("./../models/User.model");
const Post_model_1 = require("./../models/Post.model");
const express_validator_1 = require("express-validator");
exports.post_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = yield User_model_1.User.findById(req.user.id).select("-password");
        const newPost = new Post_model_1.Post({
            user: req.user.id,
            image: req.body.image,
            desc: req.body.desc,
            name: user === null || user === void 0 ? void 0 : user.name,
            avatar: user === null || user === void 0 ? void 0 : user.avatar,
        });
        const post = yield newPost.save();
        res.json(post);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
});
