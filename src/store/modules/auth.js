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

      console.log("response", response);
      return store.dispatch("auth/attemptAction", response);
    },

    async attemptAction({ commit }, token) {
      if (token != "null" || !token) {
        commit(SET_TOKEN, token);
      } else {
        return;
      }

      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });

      window.$cookies.set("token", token, "1h");

      try {
        const response = await attempt(token);
        commit(SET_USER, response);
        commit(SET_IS_AUTHENTICATED, true);
      } catch (error) {
        commit(SET_TOKEN, null);
        commit(SET_USER, null);
        commit(SET_IS_AUTHENTICATED, false);
      }
    },
  },
  getters: {
    authenticated() {
      false;
    },
  },
};
