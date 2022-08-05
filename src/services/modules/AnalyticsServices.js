import { api } from "./httpCall";

export const fetchAverageExpense = async () => {
  let data = [];

  try {
    const response = await api("GET", `/analytics/averageExpense`, {});
    data = response.data;
  } catch (error) {
    //
  }
  return data;
};

export const fetchBudgetLimitThisMonth = async () => {
  let data = [];

  try {
    const response = await api("GET", `/analytics/budgetLimitThisMonth`, {});
    data = response.data;
  } catch (error) {
    //
  }
  return data;
};

export const fetchExpenseCategorySummaryThisMonth = async () => {
  let data = [];

  try {
    const response = await api(
      "GET",
      `/analytics/expenseCategorySummaryThisMonth`,
      {}
    );
    data = response.data;
  } catch (error) {
    //
  }
  return data;
};
