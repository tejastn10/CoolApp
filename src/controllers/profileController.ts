import { Request, Response } from "express";
import { Profile } from "./../models/Profile.model";
import { validationResult } from "express-validator";

export const prof_user_get = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"],
    );

    if (!profile) {
      return res.status(400).json(
        { msg: "There is no Profile for this user!" },
      );
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
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
    social: { facebook, twitter, instagram },
  } = req.body;

  // * Build Profile Object
  const profileFields = new Profile({});
  profileFields.user = req.user.id;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (jobstatus) profileFields.jobstatus = jobstatus;
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (hobbies) {
    profileFields.hobbies = hobbies.split(",").map((hobby: String) =>
      hobby.trim()
    );
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // ? See if profile exists
    if (profile) {
      // * Update the profile
      const { hobbies, social, holidays, education, jobstatus } = profileFields;
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: {
            hobbies,
            social,
            holidays,
            education,
            jobstatus,
          },
        },
        { new: true },
      );

      return res.json(profile);
    }

    // * Create Profile
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};