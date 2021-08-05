<template>
  <div class="container"><Header /></div>
  <router-view></router-view>
</template>

<script>
import Header from "./components/Header.vue";
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
