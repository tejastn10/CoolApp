import { Schema, model, Document } from "mongoose";
import { PostComment, IPostComment } from "./Comment.model";

export interface IPost extends Document {
  user: Schema.Types.ObjectId;
  image: String;
  desc: String;
  name: String;
  avatar: String;
  likes: [
    {
      user: Schema.Types.ObjectId;
    }
  ];
  comments: [IPostComment];
  date: Date;
}

const PostSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Post = model<IPost>("post", PostSchema);
