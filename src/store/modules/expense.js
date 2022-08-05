import {
  SET_EXPENSES,
  SET_EXPENSE,
  CREATE_EXPENSE,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
} from "@/shared/mutation/expense-type";

import {
  fetchExpenses,
  createExpense,
  addExpense,
  fetchExpenseById,
  updateExpense,
  deleteExpense,
} from "@/services";

import { getField, updateField } from "vuex-map-fields";

import { cloneDeep } from "lodash";

export default {
  namespaced: true,
  state: {
    expenses: [{}],
    expense: {},
    expenseTypes: [],
    categories: [{}],
    expenseFormDialog: false,
    isEditing: false,
  },

  mutations: {
    [SET_EXPENSES](state, expenses) {
      state.expenses = expenses;
    },
    [CREATE_EXPENSE](state, { categories, types }) {
      state.categories = categories;
      state.expenseTypes = types;
    },
    [ADD_EXPENSE](state, expense) {
      state.expenses = [expense, ...state.expenses];
    },
    [SET_EXPENSE](state, expense) {
      state.expense = expense;
    },
    [UPDATE_EXPENSE](state, expense) {
      const index = state.expenses.findIndex((exp) => exp.id === expense.id);
      state.expenses.splice(index, 1, expense);
    },
    [DELETE_EXPENSE](state, id) {
      state.expenses = state.expenses.filter((exp) => exp.id !== id);
    },
    closeExpenseForm(state) {
      state.expense = {};
      state.expenseFormDialog = false;
    },
    openExpenseForm(state) {
      state.expenseFormDialog = true;
    },
    setIsEditing(state, isEditing) {
      state.isEditing = isEditing;
    },
    updateField,
  },
  actions: {
    async getExpensesAction({ commit }) {
      const response = await fetchExpenses();
      commit(SET_EXPENSES, response);
    },

    async createExpenseAction({ commit }) {
      const response = await createExpense();
      commit(CREATE_EXPENSE, {
        categories: [...response.categories],
        types: response.types,
      });
    },

    async addExpenseAction({ commit, state }) {
      const response = await addExpense(state.expense);
      commit(ADD_EXPENSE, response);
    },

    async getExpenseByIdAction({ commit }, id) {
      const response = await fetchExpenseById(id);
      commit(SET_EXPENSE, response);
    },

    async updateExpenseAction({ commit, state }) {
      const response = await updateExpense(state.expense);
      commit(UPDATE_EXPENSE, response);
    },

    async deleteExpenseAction({ commit }, id) {
      const response = await deleteExpense(id);
      commit(DELETE_EXPENSE, response);
    },
  },
  getters: {
    latestExpenses: (state) => {
      let cloneExpense = cloneDeep(state.expenses);
      return cloneExpense.splice(0, 4);
    },
    expensesThisDay: (state) => {
      return state.expenses.reduce(function (accum, expense) {
        let now = new Date();
        let check = new Date(expense.date);
        if (
          check.getFullYear() == now.getFullYear() &&
          check.getMonth() == now.getMonth() &&
          check.getDate() == now.getDate()
        ) {
          return accum + expense.cost;
        }
        return accum;
      }, 0);
    },
    expensesThisMonth: (state) => {
      return state.expenses.reduce(function (accum, expense) {
        let now = new Date();
        let check = new Date(expense.date);
        if (
          check.getFullYear() == now.getFullYear() &&
          check.getMonth() == now.getMonth()
        ) {
          return accum + expense.cost;
        }
        return accum;
      }, 0);
    },
    expensesThisYear: (state) => {
      return state.expenses.reduce(function (accum, expense) {
        let now = new Date();
        let check = new Date(expense.date);
        if (check.getFullYear() == now.getFullYear()) {
          return accum + expense.cost;
        }
        return accum;
      }, 0);
    },
    getField,
  },
};
