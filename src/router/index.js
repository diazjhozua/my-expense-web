import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.auth.isAuthenticated) {
      next();
    } else {
      next("/login");
    }
  }
  next();
});

export default router;
