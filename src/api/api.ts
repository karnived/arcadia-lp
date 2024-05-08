import axios from "axios";
import { API_URL } from "../utils/constants";

type CreateAccountParams = {
  email: string;
  nationalId: string;
  name: string;
};

export const createAccount = async (params: CreateAccountParams) => {
  const url = `${API_URL}/create-account`;

  return axios
    .post(url, params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};

export const upload = async (data: FormData) => {
  const url = `${API_URL}/upload`;

  return axios
    .post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};
