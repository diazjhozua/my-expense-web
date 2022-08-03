import { SET_CATEGORIES } from "@/shared/mutation/category-type";
import { fetchCategories } from "@/services";
export default {
  namespaced: true,
  state: {
    categories: null,
    category: null,
  },
  mutations: {
    [SET_CATEGORIES](state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    async getCategoriesAction({ commit }) {
      const response = await fetchCategories();

      commit(SET_CATEGORIES, response);
    },
  },
};
