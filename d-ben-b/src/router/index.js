import { createRouter, createWebHistory } from "vue-router";

// Home 是著陸頁（LCP 所在），維持靜態 import，避免多一次 chunk 往返延遲首屏。
// 其餘頁面改成動態 import，各自切成獨立 chunk，進到該頁才下載。
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/:catchAll(.*)",
    //redirect: "/",
    name: "Error",
    component: () => import("@/views/NotFinishedYet.vue"),
    meta: {
      routeName: "error",
    },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      routeName: "Home",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
    meta: {
      routeName: "About",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/Contact.vue"),
    meta: {
      routeName: "Contact",
    },
  },
  {
    path: "/projects",
    name: "Projects",
    component: () => import("@/views/Projects.vue"),
    meta: {
      routeName: "Projects",
    },
  },
  {
    path: "/journey",
    name: "Journey",
    component: () => import("@/views/Journey.vue"),
    meta: {
      routeName: "Journey",
    },
  },
  {
    path: "/anniversary",
    name: "Anniversary",
    component: () => import("@/views/Anniversary.vue"),
    meta: {
      routeName: "Anniversary",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
