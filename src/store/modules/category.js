import {
  SET_CATEGORIES,
  ADD_CATEGORY,
  SET_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "@/shared/mutation/category-type";
import {
  fetchCategories,
  addCategory,
  fetchCategoryById,
  updateCategory,
  deleteCategory,
} from "@/services";
import { getField, updateField } from "vuex-map-fields";

export default {
  namespaced: true,
  state: {
    categories: [{}],
    category: {},
    categoryFormDialog: false,
    isEditing: false,
  },
  mutations: {
    [SET_CATEGORIES](state, categories) {
      state.categories = categories;
    },
    [ADD_CATEGORY](state, category) {
      state.categories = [...state.categories, category];
    },
    [SET_CATEGORY](state, category) {
      state.category = category;
    },
    [UPDATE_CATEGORY](state, category) {
      const index = state.categories.findIndex((ct) => ct.id === category.id);
      state.categories.splice(index, 1, category);
    },
    [DELETE_CATEGORY](state, id) {
      state.categories = state.categories.filter((ct) => ct.id !== id);
    },
    closeCategoryForm(state) {
      state.category = {};
      state.categoryFormDialog = false;
    },
    openCategoryForm(state) {
      state.categoryFormDialog = true;
    },
    setIsEditing(state, isEditing) {
      state.isEditing = isEditing;
    },
    updateField,
  },
  actions: {
    async getCategoriesAction({ commit }) {
      const response = await fetchCategories();
      commit(SET_CATEGORIES, response);
    },

    async addCategoryAction({ commit, state }) {
      const response = await addCategory(state.category);
      commit(ADD_CATEGORY, response);
    },

    async getCategoryByIdAction({ commit }, id) {
      const response = await fetchCategoryById(id);
      commit(SET_CATEGORY, response);
    },

    async updateCategoryAction({ commit, state }) {
      const response = await updateCategory(state.category);
      commit(UPDATE_CATEGORY, response);
    },

    async deleteCategoryAction({ commit }, id) {
      const response = await deleteCategory(id);
      commit(DELETE_CATEGORY, response);
    },
  },
  getters: { getField },
};
