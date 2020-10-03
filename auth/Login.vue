<template>
  <button @click="goBack">🔙</button> &nbsp;
  <button @click="btnAction">{{ btnName }} 👤</button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { authStore as auth } from "./auth-store.ts";

const router = useRouter();

const returnTo = computed(() =>
  String(router.currentRoute.value?.query?.returnUrl)
);

export const logout = () => {
  auth.logout();
  router.push("/about");
};

export function goBack() {
  router.go(-1);
}

export function login() {
  auth
    .login("Daniele", "Daniele")
    .then(() => router.push({ path: returnTo.value }))
    .catch(alert);
}

export const btnName = auth.linkName;
export const btnAction = computed(() => (auth.isLoggedIn() ? logout : login));

export default {};
</script>

<style scoped>
button {
  font-size: 1.5em;
}
</style>
