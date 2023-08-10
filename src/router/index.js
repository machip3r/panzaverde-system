import { createRouter, createWebHistory } from "vue-router";

/* import { useAuthStore, useAlertStore } from "@/store"; */

import { Home } from "@/views";
/* import foodRoutes from "./food.routes";
import inventoryRoutes from "./inventory.routes"; */
import userRoutes from "./user.routes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/default/Default.vue"),
      children: [{ path: "", component: Home }, { ...userRoutes }],
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

export default router;

/* router.beforeEach(async (to) => {
    // clear alert on route change
    const alertStore = useAlertStore();
    alertStore.clear();

    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/account/login', '/account/register'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return '/account/login';
    }
}); */
