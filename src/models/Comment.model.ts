import { Schema, model, Document } from "mongoose";

export interface IPostComment extends Document {
  user: Schema.Types.ObjectId;
  text: String;
  name: String;
  avatar: String;
  date: Date;
}

const PostCommentSchema: Schema = new Schema({
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
});

export const PostComment = model<IPostComment>(
  "postComment",
  PostCommentSchema
);
