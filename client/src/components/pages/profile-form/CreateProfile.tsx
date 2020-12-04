import React, { FC, useState } from "react";

export const CreateProfile: FC = () => {
  const [formData, setFormData] = useState({
    user: "",
    location: "",
    bio: "",
    jobstatus: "",
    hobbies: [],
    holidays: [],
    education: [],
    social: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });

  const {
    user,
    location,
    bio,
    jobstatus,
    hobbies,
    holidays,
    education,
    social: { facebook, twitter, instagram },
  } = formData;
  return <div>Create Profile</div>;
};
