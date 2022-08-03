import { SET_CATEGORIES, ADD_CATEGORY } from "@/shared/mutation/category-type";
import { fetchCategories, addCategory } from "@/services";
import { getField, updateField } from "vuex-map-fields";

export default {
  namespaced: true,
  state: {
    categories: [{}],
    category: {
      name: null,
      limit: null,
    },
    categoryFormDialog: true,
    isEditing: false,
  },
  mutations: {
    [SET_CATEGORIES](state, categories) {
      state.categories = categories;
    },
    [ADD_CATEGORY](state, category) {
      state.categories = [...state.categories, category];
    },

    closeCategoryForm(state) {
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
  },
  getters: { getField },
};
