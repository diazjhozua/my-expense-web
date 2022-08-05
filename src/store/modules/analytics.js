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
    averageExpense: [],
    categorySummaryThisMonth: [],
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
  getters: {
    averageExpenseChartData: (state) => {
      let chartData = {
        labels: [],
        datasets: [
          {
            backgroundColor: "#455A64",
            data: [],
            label: "Average Expense",
          },
        ],
      };

      for (let i = 0; i < state.averageExpense.length; i++) {
        chartData.labels.push(state.averageExpense[i].month);
        chartData.datasets[0].data.push(state.averageExpense[i].total);
      }

      return chartData;
    },
    budgetLimitChartData: (state) => {
      let chartData = {
        labels: ["Expenses Made", "Available Budget"],
        datasets: [
          {
            label: "Percentage:",
            data: [],
            backgroundColor: ["#455A64", "#BDBDBD"],
            hoverOffset: 4,
          },
        ],
      };

      chartData.datasets[0].data.push(state.budgetLimitThisMonth.totalExpense);
      chartData.datasets[0].data.push(
        state.budgetLimitThisMonth.totalLimit -
          state.budgetLimitThisMonth.totalExpense
      );

      return chartData;
    },
    categorySummaryChartData: (state) => {
      let chartData = {
        labels: [],
        datasets: [
          {
            backgroundColor: "#BDBDBD",
            data: [],
            label: "Limit",
            fill: false,
          },
          {
            backgroundColor: "#455A64",
            data: [],
            label: "Expenses",
            fill: false,
          },
        ],
      };

      for (let i = 0; i < state.categorySummaryThisMonth.length; i++) {
        chartData.labels.push(state.categorySummaryThisMonth[i].category);
        chartData.datasets[0].data.push(
          state.categorySummaryThisMonth[i].limit
        );

        chartData.datasets[1].data.push(
          state.categorySummaryThisMonth[i].expensesMade
        );
      }

      return chartData;
    },
  },
};
