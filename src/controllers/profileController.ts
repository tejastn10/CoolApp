import { Request, Response } from "express";
import { Profile } from "./../models/Profile.model";
import { User } from "./../models/User.model";
import { validationResult } from "express-validator";
import { LogErr } from "../error/Error";

export const users_get = async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    LogErr(err, res);
  }
};

export const user_id_get = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "No Profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "No User Profile Found" });
    }
    LogErr(err, res);
  }
};

export const prof_user_get = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no Profile for this user!" });
    }

    res.json(profile);
  } catch (err) {
    LogErr(err, res);
  }
};

export const prof_post = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    location,
    bio,
    jobstatus,
    hobbies,
    facebook,
    twitter,
    instagram,
  } = req.body;

  // * Build Profile Object
  const profileFields = new Profile({});
  profileFields.user = req.user.id;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (jobstatus) profileFields.jobstatus = jobstatus;
  if (facebook) profileFields.facebook = facebook;
  if (twitter) profileFields.twitter = twitter;
  if (instagram) profileFields.instagram = instagram;
  if (hobbies) {
    profileFields.hobbies = hobbies
      .split(",")
      .map((hobby: String) => hobby.trim());
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // ? See if profile exists
    if (profile) {
      // * Update the profile
      const {
        hobbies,
        facebook,
        instagram,
        twitter,
        jobstatus,
      } = profileFields;
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: {
            hobbies,
            facebook,
            instagram,
            twitter,
            jobstatus,
          },
        },
        { new: true }
      );

      return res.json(profile);
    }

    // * Create Profile
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    LogErr(err, res);
  }
};

export const del_user = async (req: Request, res: Response) => {
  try {
    // TODO: Remove users and posts

    // ! Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // ! Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User Deleted!" });
  } catch (err) {
    LogErr(err, res);
  }
};
