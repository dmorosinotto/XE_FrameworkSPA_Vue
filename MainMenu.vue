<template>
  <nav>
    <router-link v-for="m in menu" :to="m.url" v-bind:key="m.url">
      {{ m.link }}
    </router-link>
    <a href="/#/login">LOGOUT</a>
  </nav>
  <router-view></router-view>
</template>

<script setup lang="ts">
export const menu = [
  { url: "/", link: "Root" },
  { url: "/posts", link: "Posts" },
  { url: "/post/3", link: "Direct Post" },
  { url: "/about", link: "Lazy About" },
  { url: "/NOTEXIST", link: "Not exist" },
];
export default {};
</script>

<style scoped>
nav > *::after {
  content: "|";
  padding: 10px;
}

a:visited,
a {
  color: #41b883;
  text-decoration: none;
}
a:hover {
  color: white;
  text-decoration: underline;
}
</style>