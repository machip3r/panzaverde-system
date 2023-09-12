import { createRouter, createWebHistory } from "vue-router";

import { Default } from "@/layouts/default";
import { Home, Meal, Inventory, Order, User } from "@/views";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      component: () => Default,
      redirect: "/home",
      children: [
        { path: "/home", component: Home },
        { path: "/meal", component: Meal },
        { path: "/inventory", component: Inventory },
        { path: "/order", component: Order },
        { path: "/user", component: User },
      ],
    },
    { path: "/:pathMatch(.*)*", redirect: "/home" },
  ],
});

export default router;
