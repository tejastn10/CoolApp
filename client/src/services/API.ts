import axios from "axios";

interface Params {
  name: string;
  email: string;
  password: string;
}

export const registerUser: any = async (params: Params) => {
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

export const userAuth: any = async () => {
  const url = "/api/auth";
  return axios.get(url);
};
