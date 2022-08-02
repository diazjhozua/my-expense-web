import axios from "axios";

export const login = async (payload) => {
  let token;

  try {
    const response = await axios.post(`/auth/login`, payload);
    token = response.data.data;
  } catch (error) {
    //
  }

  return token;
};

export const attempt = async () => {
  let data;
  try {
    const response = await axios.get(`/auth/me`);
    data = response.data.data;
  } catch (error) {
    console.log("error", error);
  }

  return data;
};
