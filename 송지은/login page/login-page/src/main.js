import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import VueRouter from "vue-router";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(VueRouter);

import {homepage, loginpage} from "./pages";
const routes = [
  {
    path: "/",
    component: loginpage,
  },
  {
    path: "/homepage",
    component: homepage,
  },
];

const router = new VueRouter({
  routes,
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");