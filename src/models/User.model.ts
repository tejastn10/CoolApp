import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: String;
  email: String;
  password: String;
  avatar: String;
  date: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const User = model<IUser>("user", UserSchema);
