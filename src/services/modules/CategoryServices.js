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
