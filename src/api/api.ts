import axios from "axios";
import { API_URL } from "../utils/constants";

type CreateAccountParams = {
  email: string;
  nationalId: string;
  name: string;
};

export const createAccount = (params: CreateAccountParams) => {
  const url = `${API_URL}/create-account`;

  return axios
    .post(url, params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};
