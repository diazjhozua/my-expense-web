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

export const register = async (payload) => {
  try {
    await api("POST", `/auth/register`, payload);
  } catch (error) {
    throw Error(error);
  }
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
