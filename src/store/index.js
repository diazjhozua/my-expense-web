import Vue from "vue";
import Vuex from "vuex";
import global from "@/store/modules/global";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    global,
  },
});
