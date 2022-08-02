import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueCookies from "vue-cookies";
import VueMeta from "vue-meta";
import axios from "axios";
import { API } from "@/shared/config";

Vue.config.productionTip = false;

Vue.use(VueCookies);

Vue.use(VueMeta);

axios.interceptors.request.use(function (config) {
  config.baseURL = API;
  return config;
});

store.dispatch("auth/attemptAction", window.$cookies.get("token")).then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
