import { Request, Response } from "express";
import { User } from "../models/User.model";
import { validationResult } from "express-validator";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const auth_post = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // ? See if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // ! Check Password
    const isMatch = await compare(password, <string>user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // * Return JSON WebToken
    const payload = {
      user: {
        id: user.id,
      },
    };

    sign(
      payload,
      process.env["jwtSecret"]!,
      {
        expiresIn: 360000, // ! To Change in production
      },
      (err, token) => {
        if (err) throw err;
        console.log("====================================");
        console.log(token);
        console.log("====================================");
        return res.json({ token }); // ! JSON Format is not returned on api call
      }
    );

    res.send("User Registered");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};
