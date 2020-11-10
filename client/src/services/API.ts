import axios from "axios";

interface Params {
  name: string;
  email: string;
  password: string;
}

export const api = async (params: Params) => {
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
