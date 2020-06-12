import "core-js/stable";
import "regenerator-runtime/runtime";
import Vue from "vue";
import App from "./App";
import { getRouter } from "./router/router";
import HttpClientInstance from "./plugins/HttpClient/Instance";
// import Element from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";

Vue.use(HttpClientInstance);
// Vue.use(Element);
const AppInstance = new Vue({
  render: (h: any) => h(App),
  router: getRouter()
}).$mount("#app");

/**
 * **!!!! test**
 */
//window.app = AppInstance;

export default AppInstance;
