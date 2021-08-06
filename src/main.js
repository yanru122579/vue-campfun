import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import "./assets/cart.css";
//測試用
// import Vue from "vue";
// import { createPopper } from "@popperjs/core";
// import BootstrapVue from "bootstrap-vue";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";
// Vue.use(BootstrapVue);

createApp(App)
  .use(router)
  .mount("#app");
