import { createRouter, createWebHistory } from "vue-router";

import { Default } from "@/layouts/default";
import { Home, Meal, Client, Route, Subscription, Plan, Statistics, Inventory, User } from "@/views";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      component: Default,
      redirect: "/home",
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/meal",
      component: Meal,
    },
    {
      path: "/client",
      component: Client,
    },
    {
      path: "/route",
      component: Route,
    },
    {
      path: "/subscription",
      component: Subscription,
    },
    {
      path: "/plan",
      component: Plan,
    },
    {
      path: "/statistics",
      component: Statistics,
    },
    {
      path: "/inventory",
      component: Inventory,
    },
    {
      path: "/user",
      component: User,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/home",
    },
  ],
});

export default router;
