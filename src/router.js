import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/register",
    alias: "/register",
    name: "Register",
    component: () => import("@/components/Register.vue"),
  },
  {
    path: "/login",
    alias: "/login",
    name: "Login",
    component: () => import("@/components/Login.vue"),
  },
  {
    path: "/",
    alias: "/dashboard",
    name: "Dashboard",
    component: () => import("@/components/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/courses",
    alias: "/courses",
    name: "Courses",
    component: () => import("@/components/CourseList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/course/add",
    alias: "/course/add",
    name: "CourseAdd",
    component: () => import("@/components/CourseAdd.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/course/:id",
    alias: "/course/:id",
    name: "CourseDetails",
    component: () => import("@/components/ModuleLecturePage.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/course/:courseId/module/add",
    alias: "/course/:courseId/module/add",
    name: "ModuleAdd",
    component: () => import("@/components/ModuleAdd.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/course/:courseId/module/:moduleId",
    alias: "/course/:courseId/module/:moduleId",
    name: "ModuleLectures",
    component: () => import("@/components/LectureList.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/course/:courseId/module/:moduleId/lecture/add",
    alias: "/course/:courseId/module/:moduleId/lecture/add",
    name: "LectureAdd",
    component: () => import("@/components/LectureAdd.vue"),
    meta: { requiresAuth: true },
    props: (route) => ({
      courseId: route.params.courseId,
      moduleId: route.params.moduleId,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard (Authentication Check)
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");

  console.log("Auth Check:", isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;