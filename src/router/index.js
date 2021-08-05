import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import CartOrder from "../views/CartOrder";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cartorder",
    name: "CartOrder",
    component: CartOrder,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
