import Vue from "vue";
import VueRouter from "vue-router";
import Calendar from "../views/calendar/Calendar.vue";
Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "Calendar",
    component: Calendar,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});
export default router;
