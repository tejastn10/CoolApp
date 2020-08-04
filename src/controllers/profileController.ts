import { Request, Response } from "express";
import { Profile } from "./../models/Profile.model";
import { User } from "./../models/User.model";
import { validationResult } from "express-validator";

export const users_get = async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
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
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "No User Profile Found" });
    }
    res.status(500).send("Server Error!");
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
    profileFields.hobbies = hobbies
      .split(",")
      .map((hobby: String) => hobby.trim());
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

export const put_holidays = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, location, from, to, current, description } = req.body;

  const newHoliday = { title, location, from, to, current, description };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile?.holidays.unshift(newHoliday);
    await profile?.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

export const del_holidays = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get Remove Index
    const removeIndex = profile?.holidays
      .map((item: any) => item.id) // ! Type used any
      .indexOf(req.params.holi_id);

    profile?.holidays.splice(removeIndex!, 1);

    await profile?.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

export const put_edu = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile?.education.unshift(newEdu);
    await profile?.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

export const del_edu = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get Remove Index
    const removeIndex = profile?.education
      .map((item: any) => item.id)
      .indexOf(req.params.edu_id);

    profile?.education.splice(removeIndex!, 1);

    await profile?.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
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
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};
