import { login, attempt } from "@/services";

import {
  SET_TOKEN,
  SET_USER,
  SET_IS_AUTHENTICATED,
} from "@/shared/mutation/auth-type";
import axios from "axios";
import store from "@/store";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    token: null,
    user: null,
  },
  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token;
    },
    [SET_IS_AUTHENTICATED](state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    [SET_USER](state, data) {
      state.user = data;
    },
  },
  actions: {
    async loginAction(_, userCreds) {
      const response = await login(userCreds);

      return store.dispatch("auth/attemptAction", response);
    },

    async attemptAction({ commit }, token) {
      if (token != "null" && token) {
        commit(SET_TOKEN, token);
      } else {
        window.$cookies
          .keys()
          .forEach((cookie) => window.$cookies.remove(cookie));

        return;
      }

      window.$cookies.set("token", token, "1h");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await attempt();

      if (response) {
        commit(SET_USER, response);
        commit(SET_IS_AUTHENTICATED, true);
      } else {
        window.$cookies
          .keys()
          .forEach((cookie) => window.$cookies.remove(cookie));
        commit(SET_TOKEN, null);
        commit(SET_USER, null);
        commit(SET_IS_AUTHENTICATED, false);
      }
    },
    logoutAction({ commit }) {
      window.$cookies
        .keys()
        .forEach((cookie) => window.$cookies.remove(cookie));

      axios.defaults.headers.common["Authorization"] = null;
      commit(SET_TOKEN, null);
      commit(SET_USER, null);
      commit(SET_IS_AUTHENTICATED, false);
    },
  },
  getters: {},
};
