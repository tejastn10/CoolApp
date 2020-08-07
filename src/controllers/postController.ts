import { Request, Response } from "express";
import { User } from "./../models/User.model";
import { Post } from "./../models/Post.model";
import { validationResult } from "express-validator";

export const post_post = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      user: req.user.id,
      image: req.body.image,
      desc: req.body.desc,
      name: user?.name,
      avatar: user?.avatar,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};
