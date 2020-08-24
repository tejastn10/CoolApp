"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostComment = void 0;
const mongoose_1 = require("mongoose");
const PostCommentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
    },
    text: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.PostComment = mongoose_1.model("postComment", PostCommentSchema);
