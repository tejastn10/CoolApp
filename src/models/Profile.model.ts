import { Schema, model, Document } from "mongoose";

export interface IProfile extends Document {
  user: String;
  location: String;
  bio: String;
  jobstatus: String;
  hobbies: [String];
  holidays: [{
    title: String;
    location: String;
    from: Date;
    to: Date;
    current: Boolean;
    description: String;
  }];
  education: [{
    school: String;
    degree: String;
    fieldofstudy: String;
    from: Date;
    to: Date;
    current: Boolean;
    description: String;
  }];
  social: {
    facebook: String;
    twitter: String;
    instagram: String;
  };
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
  holidays: [
    {
      title: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Profile = model<IProfile>("profile", ProfileSchema);
