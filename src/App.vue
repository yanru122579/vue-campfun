<template>
  <div class="container"><Header /></div>
  <router-view></router-view>
</template>

<script>
import Header from "./components/Header.vue";
// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Vue.use(BootstrapVue);
// Vue.use(IconsPlugin);
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
@import "assets/cart.css";
</style>
