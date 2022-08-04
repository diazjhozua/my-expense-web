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

export default {
  namespaced: true,
  state: {
    expenses: [{}],
    expense: {},
    expenseTypes: [{}],
    categories: [{}],
    expenseFormDialog: false,
    isEditing: false,
  },

  mutations: {
    [SET_EXPENSES](state, expenses) {
      state.expenses = expenses;
    },
    [CREATE_EXPENSE](state, categories, expenseTypes) {
      state.categories = categories;
      state.expenseTypes = expenseTypes;
    },
    [ADD_EXPENSE](state, expense) {
      state.expenses = [...state.expenses, expense];
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
    openCategoryForm(state) {
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
      commit(CREATE_EXPENSE, response.categories, response.types);
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
  getters: { getField },
};
