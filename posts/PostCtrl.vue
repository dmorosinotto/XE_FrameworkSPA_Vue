<template>
  <button @click="incLike">❤️ {{ info.likes }}</button><br />
  <!-- GESTIONE CLASSICA setHashtag FATTA CON EVENTI PostCtrl => MyCard => App -->
  <!-- <span v-for="tag in info.hashtags" @click="setHashtag(tag)">{{ tag }}</span> -->

  <!-- GESTIONE setHashtag FATTA TRAMITE Store (currHashtag SHARED STATE) PER EVITARE BUBBLE UP -->
  <span v-for="tag in info.hashtags" :key="tag" @click="S.setHashtag(tag)">#{{ tag }}</span>
</template>

<script setup="props, { emit }" lang="ts">
import { reactive } from 'vue';
import type { Info } from "./local-infos";
export { postStore as S } from "./post-store";

declare const props: { info: Info };
/*
// GESTIONE CLASSICA setHashtag FATTA CON EVENTI child => parent => App
declare function emit(event: "setHashtag", payload: string): void;
export function setHashtag(tag: string) {
  emit("setHashtag", tag);
}
*/

// GESTIONE CLASSICA like FATTA CON EVENTI child => parent => App store
declare function emit(event: "like", payload: Info): void;
export function incLike(tag: string) {
  emit("like", props.info);
}

export default { inheritAttrs: false };
</script>
<style scoped>
span {
  padding: 5px;
  text-decoration: underline;
}
span:hover {
  color: green;
}
</style>

