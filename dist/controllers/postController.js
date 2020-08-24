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
exports.del_comment = exports.post_comment = exports.put_unlike = exports.put_like = exports.del_postbyid = exports.get_postbyid = exports.get_post = exports.post_post = void 0;
const User_model_1 = require("./../models/User.model");
const Post_model_1 = require("./../models/Post.model");
const express_validator_1 = require("express-validator");
const Comment_model_1 = require("./../models/Comment.model");
const Error_1 = require("./../global/Error");
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
        Error_1.LogErr(err, res);
    }
});
exports.get_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_model_1.Post.find().sort({ date: -1 });
        res.json(posts);
    }
    catch (err) {
        Error_1.LogErr(err, res);
    }
});
exports.get_postbyid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_model_1.Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ msg: "Post not found" });
        }
        res.json(post);
    }
    catch (err) {
        if (err.kind === "ObjectId") {
            res.status(404).json({ msg: "Post not found" });
        }
        Error_1.LogErr(err, res);
    }
});
exports.del_postbyid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_model_1.Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ msg: "Post not found" });
        }
        // ? Check user
        if ((post === null || post === void 0 ? void 0 : post.user.toString()) !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }
        yield (post === null || post === void 0 ? void 0 : post.remove());
        res.json({ msg: "Post Deleted!" });
    }
    catch (err) {
        if (err.kind === "ObjectId") {
            res.status(404).json({ msg: "Post not found" });
        }
        Error_1.LogErr(err, res);
    }
});
exports.put_like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_model_1.Post.findById(req.params.id);
        // ? Check if already liked
        if ((post === null || post === void 0 ? void 0 : post.likes.filter((like) => like.user.toString() === req.user.id).length) > 0) {
            return res.status(400).json({ msg: "Post already liked" });
        }
        post === null || post === void 0 ? void 0 : post.likes.unshift({ user: req.user.id });
        yield (post === null || post === void 0 ? void 0 : post.save());
        res.json(post === null || post === void 0 ? void 0 : post.likes);
    }
    catch (err) {
        Error_1.LogErr(err, res);
    }
});
exports.put_unlike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_model_1.Post.findById(req.params.id);
        // ? Check if already unliked
        if ((post === null || post === void 0 ? void 0 : post.likes.filter((like) => like.user.toString() === req.user.id).length) === 0) {
            return res.status(400).json({ msg: "Post already unliked" });
        }
        // * Get Remove Index
        const removeIndex = post === null || post === void 0 ? void 0 : post.likes.map((like) => like.user.toString()).indexOf(req.user.id);
        post === null || post === void 0 ? void 0 : post.likes.splice(removeIndex, 1);
        yield (post === null || post === void 0 ? void 0 : post.save());
        res.json(post === null || post === void 0 ? void 0 : post.likes);
    }
    catch (err) {
        Error_1.LogErr(err, res);
    }
});
exports.post_comment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = yield User_model_1.User.findById(req.user.id).select("-password");
        const post = yield Post_model_1.Post.findById(req.params.id);
        // ? Check if USER is NULL
        if (user === null) {
            return res.status(401).json({ msg: "User is null" });
        }
        const newComment = new Comment_model_1.PostComment({
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
        });
        post === null || post === void 0 ? void 0 : post.comments.unshift(newComment);
        yield post.save();
        res.json(post === null || post === void 0 ? void 0 : post.comments);
    }
    catch (err) {
        Error_1.LogErr(err, res);
    }
});
exports.del_comment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_model_1.Post.findById(req.params.id);
        // * Get the comment
        const comment = post === null || post === void 0 ? void 0 : post.comments.find((comment) => comment.id === req.params.comment_id);
        // ? Comment exists
        if (!comment) {
            res.status(404).json({ msg: "Comment does not exists!" });
        }
        // ? Check user
        if (comment.user.toString() !== req.user.id) {
            res.status(401).json({ msg: "User not Authorized" });
        }
        // * Get Remove Index
        const removeIndex = post === null || post === void 0 ? void 0 : post.comments.map((comment) => comment.user.toString()).indexOf(req.user.id);
        post === null || post === void 0 ? void 0 : post.comments.splice(removeIndex, 1);
        yield (post === null || post === void 0 ? void 0 : post.save());
        res.json(post === null || post === void 0 ? void 0 : post.comments);
    }
    catch (err) {
        Error_1.LogErr(err, res);
    }
});
