import axios from "axios";

interface Auth {
  name?: string;
  email: string;
  password: string;
}

interface Profile {
  location: string;
  bio: string;
  jobstatus: string;
  hobbies: [string];
  facebook: string;
  twitter: string;
  instagram: string;
}

export const registerUser: any = async (params: Auth) => {
  const { name, email, password } = params;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });
  const url = "/api/users";

  return axios.post(url, body, config);
};

export const loginUser: any = async (params: Auth) => {
  const { email, password } = params;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  const url = "/api/auth";

  return axios.post(url, body, config);
};

export const userAuth: any = async () => {
  const url = "/api/auth";
  return axios.get(url);
};

export const getCurrentProfile: any = async () => {
  const url = "/api/profile/me";
  return axios.get(url);
};

export const userProfile: any = async (params: Profile) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = "/api/profile";

  return axios.post(url, params, config);
};
