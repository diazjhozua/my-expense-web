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
    deleteDialog: {
      visible: false,
      title: "",
      message: "",
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
    setDeleteDialog(state, payload) {
      state.deleteDialog = payload;
    },
  },
};
