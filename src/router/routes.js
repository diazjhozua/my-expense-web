import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/Auth/LoginView";
import RegisterView from "@/views/Auth/RegisterView";

export default [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
];
