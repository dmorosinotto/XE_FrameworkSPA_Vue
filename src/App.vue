<template>
  <h1>Welcome to {{ msg }}</h1>
  <!-- <Suspense>
    <template #default> -->
  <router-view></router-view>
  <!-- </template>
    <template #fallback>
      <img src="/assets/loading.gif" alt="Loading, please wait..." />
    </template>
  </Suspense> -->
</template>

<script setup lang="ts">
export const msg = "XE Framework SPA - Vue";
export default {};
</script>

<style>
:root {
  --vue-green: #41b883;
  --vue-blue: #34495e;
  --warn: red;
  --text: white;
}
</style>


