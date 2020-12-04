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
exports.del_user = exports.prof_post = exports.prof_user_get = exports.user_id_get = exports.users_get = void 0;
const Profile_model_1 = require("./../models/Profile.model");
const User_model_1 = require("./../models/User.model");
const express_validator_1 = require("express-validator");
const Error_1 = require("../error/Error");
exports.users_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield Profile_model_1.Profile.find().populate("user", ["name", "avatar"]);
        res.json(profiles);
    }
    catch (err) {
        Error_1.LogErr(err, res);
    }
});
exports.user_id_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield Profile_model_1.Profile.findOne({
            user: req.params.user_id,
        }).populate("user", ["name", "avatar"]);
        if (!profile) {
            return res.status(400).json({ msg: "No Profile for this user" });
        }
        res.json(profile);
    }
    catch (err) {
        if (err.kind == "ObjectId") {
            return res.status(400).json({ msg: "No User Profile Found" });
        }
        Error_1.LogErr(err, res);
    }
});
exports.prof_user_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield Profile_model_1.Profile.findOne({
            user: req.user.id,
        }).populate("user", ["name", "avatar"]);
        if (!profile) {
            return res
                .status(400)
                .json({ msg: "There is no Profile for this user!" });
        }
        res.json(profile);
    }
    catch (err) {
        Error_1.LogErr(err, res);
    }
});
exports.prof_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { location, bio, jobstatus, hobbies, facebook, twitter, instagram, } = req.body;
    // * Build Profile Object
    const profileFields = new Profile_model_1.Profile({});
    profileFields.user = req.user.id;
    if (location)
        profileFields.location = location;
    if (bio)
        profileFields.bio = bio;
    if (jobstatus)
        profileFields.jobstatus = jobstatus;
    if (facebook)
        profileFields.facebook = facebook;
    if (twitter)
        profileFields.twitter = twitter;
    if (instagram)
        profileFields.instagram = instagram;
    if (hobbies) {
        profileFields.hobbies = hobbies
            .split(",")
            .map((hobby) => hobby.trim());
    }
    try {
        let profile = yield Profile_model_1.Profile.findOne({ user: req.user.id });
        // ? See if profile exists
        if (profile) {
            // * Update the profile
            const { hobbies, facebook, instagram, twitter, jobstatus, } = profileFields;
            profile = yield Profile_model_1.Profile.findOneAndUpdate({ user: req.user.id }, {
                $set: {
                    hobbies,
                    facebook,
                    instagram,
                    twitter,
                    jobstatus,
                },
            }, { new: true });
            return res.json(profile);
        }
        // * Create Profile
        profile = new Profile_model_1.Profile(profileFields);
        yield profile.save();
        res.json(profile);
    }
    catch (err) {
        Error_1.LogErr(err, res);
    }
});
exports.del_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Remove users and posts
        // ! Remove Profile
        yield Profile_model_1.Profile.findOneAndRemove({ user: req.user.id });
        // ! Remove User
        yield User_model_1.User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: "User Deleted!" });
    }
    catch (err) {
        Error_1.LogErr(err, res);
    }
});
