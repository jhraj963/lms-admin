import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/Dashboard",
    name: "Dashboard",
    component: () => import("./components/Dashboard.vue"),
  },
  {
    path: "/courses",
    alias: "/",
    name: "courses",
    component: () => import("./components/CourseList.vue"),
  },
  {
    path: "/course/add",
    alias: "/",
    name: "course-add",
    component: () => import("./components/CourseAdd.vue"),
    props: true
  },
  {
    path: "/course/:id",
    alias: "/",
    name: "course-details",
    component: () => import("./components/ModuleLecturePage.vue"),
    props: true
  },
  {
    path: "/course/:courseId/module/add",
    alias: "/",
    name: "module-add",
    component: () => import("./components/ModuleAdd.vue"),
    props: true
  },
  {
    path: "/course/:courseId/module/:moduleId",
    alias: "/",
    name: "module-lectures",
    component: () => import("./components/LectureList.vue"),
    props: true
  },
  {
    path: "/course/:courseId/module/:moduleId/lecture/add",
    name: "lecture-add",
    component: () => import("./components/LectureAdd.vue"),
    props: route => ({
        courseId: route.params.courseId,
        moduleId: route.params.moduleId
    })
  }
 ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
