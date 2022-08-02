import { api } from "./httpCall";

export const login = async (payload) => {
  let token;

  try {
    const response = await api("POST", `/auth/login`, payload);
    token = response.data;
  } catch (error) {
    //
  }
  return token;
};

export const attempt = async () => {
  let data;
  try {
    const response = await api("GET", `/auth/me`, {});
    data = response.data;
  } catch (error) {
    //
  }

  return data;
};
