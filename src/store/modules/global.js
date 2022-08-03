export default {
  namespaced: true,
  state: {
    isLoading: false,
    isAuthenticated: false,
    alert: {
      visible: false,
      type: "info",
      text: "",
    },
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
