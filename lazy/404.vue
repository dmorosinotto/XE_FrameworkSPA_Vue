<template>
  <header>
    <h1>{{ msg }}</h1>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
export const msg = "404 - PAGE NOT FOUND";
setTimeout(() => router.replace("/"), 5000); //AUTO REDIRECT A "/" DOPO 5sec
export default {};
</script>

<style scoped>
header {
  width: 100%;
  height: 100%;
  margin: 0px;
  left: 0px;
  top: 0px;
  position: fixed;
  background-image: url(/assets/404-one-piece.jpg);
}
h1 {
  position: absolute;
  right: 12%;
  top: 12%;
  color: red;
}
</style>
