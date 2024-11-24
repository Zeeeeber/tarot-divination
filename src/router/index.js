/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/Login.vue";
import RegisterPage from "../views/Register.vue";
import HomePage from "../views/Home.vue";
import DivinationPage from "../views/Divination.vue";
import AboutPage from "../views/About.vue";  // 添加这行

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage
  },
  {
    path: "/home",
    name: "home",
    component: HomePage
  },
  {
    path: "/divination/:type",
    name: "divination",
    component: DivinationPage
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;