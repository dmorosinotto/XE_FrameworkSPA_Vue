<template>
  <MyButton :disabled="!currUserId" @click="incLike" :text="'❤️ '+ info.likes" /><br />

  <!-- GESTIONE setHashtag FATTA TRAMITE Store (currHashtag SHARED STATE) PER EVITARE BUBBLE UP -->
  <span v-for="tag in info.hashtags" :key="tag" @click="S.setHashtag(tag)">#{{ tag }}</span>
</template>

<script setup="props, { emit }" lang="ts">
import { computed } from 'vue';
import type { Info } from "./local-infos";
export { default as MyButton} from "../toolbox/MyButton.vue";
export { postStore as S } from "./post-store";
export { currUserId } from "../auth/auth-store";

declare const props: { info: Info };

// GESTIONE CLASSICA like FATTA CON EVENTI child => parent => Post store
declare function emit(event: "like", payload: Info): void;
export function incLike() {
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

