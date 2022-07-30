import HomeView from "../views/HomeView.vue";

export default [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Auth/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Auth/RegisterView.vue"),
  },
];
