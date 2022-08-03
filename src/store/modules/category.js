export default {
  namespaced: true,
  state: {
    categories: null,
    category: null,
  },
  mutations: {
    setAlert(state, alertObj) {
      state.alert = alertObj;
    },
    closeAlert(state) {
      state.alert.visible = false;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
};
