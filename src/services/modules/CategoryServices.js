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
    throw Error(error);
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const response = await api("GET", `/category/${id}`, {});
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

export const updateCategory = async (payload) => {
  try {
    const response = await api("PUT", `/category/${payload.id}`, payload);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

export const deleteCategory = async (id) => {
  try {
    await api("DELETE", `/category/${id}`, {});
    return id;
  } catch (error) {
    throw Error(error);
  }
};
