import {
  SET_AVERAGE_EXPENSE,
  SET_BUDGET_LIMIT_THIS_MONTH,
  SET_CATEGORY_SUMMARY,
} from "@/shared/mutation/analytics-type";

import {
  fetchAverageExpense,
  fetchBudgetLimitThisMonth,
  fetchExpenseCategorySummaryThisMonth,
} from "@/services";

export default {
  namespaced: true,
  state: {
    averageExpense: [{}],
    categorySummaryThisMonth: [{}],
    budgetLimitThisMonth: {},
  },

  mutations: {
    [SET_AVERAGE_EXPENSE](state, averageExpense) {
      state.averageExpense = averageExpense;
    },
    [SET_BUDGET_LIMIT_THIS_MONTH](state, budgetLimitThisMonth) {
      state.budgetLimitThisMonth = budgetLimitThisMonth;
    },
    [SET_CATEGORY_SUMMARY](state, categorySummaryThisMonth) {
      state.categorySummaryThisMonth = categorySummaryThisMonth;
    },
  },
  actions: {
    async getAverageExpenseAction({ commit }) {
      const response = await fetchAverageExpense();
      commit(SET_AVERAGE_EXPENSE, response);
    },

    async getBudgetLimitThisMonthAction({ commit }) {
      const response = await fetchBudgetLimitThisMonth();
      commit(SET_BUDGET_LIMIT_THIS_MONTH, response);
    },

    async getCategorySummaryThisMonthAction({ commit }) {
      const response = await fetchExpenseCategorySummaryThisMonth();
      commit(SET_CATEGORY_SUMMARY, response);
    },
  },
};
