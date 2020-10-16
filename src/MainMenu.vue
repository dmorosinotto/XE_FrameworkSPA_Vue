<template>
  <nav>
    <router-link to="login">{{logInOut}}</router-link>
    <router-link :to="{name:'direct-post', params:{ id: 3 }}">LINK NAME+PARAMS</router-link>
    <router-link v-for="m in menu" :to="m.url" v-bind:key="m.url">
      {{ m.link.toUpperCase() }}
    </router-link>
  </nav>
  <router-view></router-view>
</template>

<script setup lang="ts">
export { logInOut } from "./auth/auth-store";
export const menu = [
  { url: "/posts", link: "Posts" },
  { url: "/NOTEXIST", link: "Not exist" },
  { url: "/extra", link: "EXTRA" },
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
  color: var(--vue-green, silver);
  text-decoration: none;
}
a:hover {
  color: var(--text, white);
  text-decoration: underline;
}
</style>