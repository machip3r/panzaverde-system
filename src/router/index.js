import { createRouter, createWebHistory } from "vue-router";

import { Default } from "@/layouts/default";
import { Home, Meal, Inventory, User } from "@/views";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    /* {
      path: "/", */
    /* component: () => Default, */
    /* component: Home, */
    /* redirect: "/home", */
    /* children: [ */
    /* { path: "/home", component: Home, }, */
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/meal",
      component: Meal,
    },
    {
      path: "/inventory",
      component: Inventory,
    },
    {
      path: "/user",
      component: User,
    },
    { path: "/:pathMatch(.*)*", redirect: "/home" },
  ],
  /* }, */
  /* { path: "/:pathMatch(.*)*", redirect: "/home" }, */
  /* ], */
});

export default router;
