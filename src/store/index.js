import Vue from "vue";
import Vuex from "vuex";
import global from "@/store/modules/global";
import auth from "@/store/modules/auth";
import category from "@/store/modules/category";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    global,
    auth,
    category,
  },
});
