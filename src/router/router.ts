import Vue from "vue";
import VueRouter, { Route } from "vue-router";

Vue.use(VueRouter);
const routerInstance = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "demo",
      component: () => import(/* webpackChunkName: "Demo" */ "@src/views/demo")
    }
  ]
});

export function getRouter() {
  return routerInstance;
}
