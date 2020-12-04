"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const mongoose_1 = require("mongoose");
const ProfileSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    location: {
        type: String,
    },
    bio: {
        type: String,
    },
    jobstatus: {
        type: String,
        required: true,
    },
    hobbies: {
        type: [String],
        required: true,
    },
    facebook: {
        type: String,
    },
    twitter: {
        type: String,
    },
    instagram: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.Profile = mongoose_1.model("profile", ProfileSchema);
