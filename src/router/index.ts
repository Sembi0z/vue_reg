// @ts-nocheck
import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "",
          component: () => import("@/pages/HomePage.vue"),
        },
        {
          path: "add",
          component: () => import("@/pages/AddUser.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("@/pages/EditUser.vue"),
        },
        {
          path: "map/:lat/:long/:zoom",
          component: () => import("@/pages/Map.vue"),
        },
      ],
    },
  ],
});

export default router;
