import { api } from "./httpCall";

export const fetchCategories = async () => {
  let data = [];

  try {
    const response = await api("GET", `/category`, {});
    data = response.data;
  } catch (error) {
    //
  }
  return data;
};

export const addCategory = async (payload) => {
  try {
    const response = await api("POST", `/category`, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw Error(error);
  }
};
