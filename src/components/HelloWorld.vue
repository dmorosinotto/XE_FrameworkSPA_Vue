<template>
  <h1>{{ msg + double }}</h1>
  <button @click="count++">Counter is: {{ count }}</button>
  <p>Edit <code @click="alert()">components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script setup="props" lang="ts">
import { computed, ref } from "vue";
declare const props: { msg: string };

export const name = "Hello world";
export const count = ref(0);
export const double = computed(()=>count.value*2)
export function alert(){
    count.value = count.value * Math.random();
    window.alert(count.value);
}

</script>
