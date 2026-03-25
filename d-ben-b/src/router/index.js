import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";
import NotFinishedYet from "../views/NotFinishedYet.vue";
import Projects from "@/views/Projects.vue";
import Journey from "@/views/Journey.vue";
import Anniversary from "@/views/Anniversary.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/:catchAll(.*)",
    //redirect: "/",
    name: "Error",
    component: NotFinishedYet,
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
    component: About,
    meta: {
      routeName: "About",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: {
      routeName: "Contact",
    },
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    meta: {
      routeName: "Projects",
    },
  },
  {
    path: "/journey",
    name: "Journey",
    component: Journey,
    meta: {
      routeName: "Journey",
    },
  },
  {
    path: "/anniversary",
    name: "Anniversary",
    component: Anniversary,
    meta: {
      routeName: "Anniversary",
    },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
