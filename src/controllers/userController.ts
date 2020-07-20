import { Request, Response } from "express";
import { User } from "../models/User.model";
import { validationResult } from "express-validator";
import { genSalt, hash } from "bcryptjs";
import { url } from "gravatar";

export const user_post = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // ? See if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // * Get User gravatar
    const avatar = url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    // * Encrypt password
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();

    // TODO Return JSON WebToken

    res.send("User Registered");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};
