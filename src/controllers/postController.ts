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

export const get_post = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

export const get_postbyid = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error!");
  }
};

export const del_postbyid = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    }

    // ? Check user
    if (post?.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post?.remove();

    res.json({ msg: "Post Deleted!" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error!");
  }
};
