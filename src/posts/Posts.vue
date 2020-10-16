<template>
  <label class="inline">
    Search tag: <input type="text" v-model.lazy.trim="currHashtag" /> 🔍
  </label>
  <div class="posts">
    <MyCard v-for="post in S.filterPosts" :key="post.id" w="30%">
      <template v-slot:head>
        <PostHSlag :pid="post.id" :likes="post.info.likes" :title="post.title" />
      </template>
      {{ post.body }}
      <template v-slot:foot>
        <PostCtrl :info="post.info" @like="S.incrementLike($event, post.id)" />
      </template>
    </MyCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
export { RouterLink } from "vue-router";
export { default as MyCard } from "../toolbox/MyCard.vue";
export { default as PostCtrl } from "./PostCtrl.vue";
export { default as PostHSlag } from "./PostHSlag";
import { postStore } from "./post-store";
import { isLoggedIn } from "../auth/auth-store";
// import { WrapGetSet } from "../toolbox/WrapGetSet";
export const S = ref(postStore); //REFACTOR ESPONGO LO store AL <template> PER INVOCARE DIRETTAMENTE GETTERS/METODI

onMounted(
  //AL CARICAMENTO DEL COMPONENTE CARICO I DATI DEI POST PER UTENTE CORRENTE NELLO store
  async () => await postStore.fetchPostsForUser().catch(alert) //ALERT ERROR
);

//ESEMPIO ROUTEGARD PER CONTROLARE USCITA
onBeforeRouteLeave((to, from, next) => {
  if (isLoggedIn()) {
    const answer = window.confirm(`Vuoi salvare i tuoi voti (Likes)?`);
    if (!answer) return false; //TORNANDO false ANNULLO LA NAVIGAZIONE!
    postStore.saveLikesForUser(); //SALVO I LIKES DELL'UTENTE SU localStorage
  } 
  next(); //E POI PROSEGUO CON LA NAVIGAZIONE
});

//USO UNA COMPUTED CON getter/setter CUSTOM PER INVOCARE LOGICA store X INTERAGIRE CON v-model
export const currHashtag = computed({
  get: () => postStore.currHashtag.value,
  set: (val) => postStore.setHashtag(val!)
});


export default {};
</script>

<style scoped>
.posts {
  display: flex;
  flex-wrap: wrap;
  color: var(--vue-blue, black);
  font-size: 16px;
}
.posts > * {
  background-color: white;
}
.inline {
  display: flex;
  font-size: 18px;
  padding: 10px;
}
.inline > input {
  width: 80%;
  margin-left: 30px;
  height: 24px;
  font-size: inherit;
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
}
</style>
