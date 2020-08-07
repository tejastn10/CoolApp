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

export const put_like = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    // ? Check if already liked
    if (
      post?.likes.filter((like) => like.user.toString() === req.user.id)
        .length! > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post?.likes.unshift({ user: req.user.id });

    await post?.save();

    res.json(post?.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

export const put_unlike = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    // ? Check if already unliked
    if (
      post?.likes.filter((like) => like.user.toString() === req.user.id)
        .length! === 0
    ) {
      return res.status(400).json({ msg: "Post already unliked" });
    }

    // * Get Remove Index
    const removeIndex = post?.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post?.likes.splice(removeIndex!, 1);

    await post?.save();

    res.json(post?.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

export const post_comment = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);

    const newComment: any = {
      user: req.user.id,
      text: req.body.text,
      name: user?.name,
      avatar: user?.avatar,
    };

    post?.comments.unshift(newComment);

    await post!.save();

    res.json(post?.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};

export const del_comment = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    // * Get the comment
    const comment = post?.comments.find(
      (comment: any) => comment.id === req.params.comment_id
    );

    // ? Comment exists
    if (!comment) {
      res.status(404).json({ msg: "Comment does not exists!" });
    }

    // ? Check user
    if (comment!.user.toString() !== req.user.id) {
      res.status(401).json({ msg: "User not Authorized" });
    }

    // * Get Remove Index
    const removeIndex = post?.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post?.comments.splice(removeIndex!, 1);

    await post?.save();

    res.json(post?.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
};
