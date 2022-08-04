import { api } from "./httpCall";

export const fetchExpenses = async () => {
  let data = [];

  try {
    const response = await api("GET", `/expense`, {});
    data = response.data;
  } catch (error) {
    //
  }
  return data;
};

// get the data need for creating/editing a expense
export const createExpense = async () => {
  let data = [];

  try {
    const response = await api("GET", `/expense/create`, {});
    data = response.data;
  } catch (error) {
    //
  }
  return data;
};

export const addExpense = async (payload) => {
  try {
    const response = await api("POST", `/expense`, payload);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

export const fetchExpenseById = async (id) => {
  try {
    const response = await api("GET", `/expense/${id}`, {});
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

export const updateExpense = async (payload) => {
  try {
    const response = await api("PUT", `/expense/${payload.id}`, payload);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

export const deleteExpense = async (id) => {
  try {
    await api("DELETE", `/expense/${id}`, {});
    return id;
  } catch (error) {
    throw Error(error);
  }
};
