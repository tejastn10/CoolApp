import { Schema, model, Document } from "mongoose";

export interface IProfile extends Document {
  user: String;
  location: String;
  bio: String;
  jobstatus: String;
  hobbies: [String];
  facebook: String;
  twitter: String;
  instagram: String;

  date: Date;
}

const ProfileSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  jobstatus: {
    type: String,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Profile = model<IProfile>("profile", ProfileSchema);
