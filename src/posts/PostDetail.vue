<template>
  <MyCard w="90%" class="detail">
    <template v-slot:head>
      <h3><button @click="goBack">🔙</button>{{ currPost.title }}</h3>
    </template>
    <p v-html="currPost.body"></p>
    <template v-slot:foot>
      <h5>COMMENTS:</h5>
      <dl v-for="c in currPost.comments" :key="c.id">
        <dt>{{ c.email }}</dt>
        <dd>{{ c.body }}</dd>
      </dl>
    </template>
  </MyCard>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
export { default as MyCard } from "../toolbox/MyCard.vue";
export { currUserId } from "../auth/auth-store"
import { BASEAPI } from "../auth/auth-store";

const route = useRoute();
const router = useRouter();
export const currPost = ref({});

const fetchPostDetails = async (postId: number) => {
  try {
    //ESEGUO DUE RICHIESTE IN PARALLELO E POI AGGREGO I DATI
    const reqs = [`${postId}`, `${postId}/comments`];
    const responses = await Promise.all(
      reqs.map((req) => window.fetch(`${BASEAPI}/posts/${req}`))
    );
    const data = await Promise.all(responses.map((res) => res.json()));
    const post = data[0];
    post.comments = data[1];
    if (post.id !== postId) throw `NOT FOUND ${postId}`;
    console.warn("POST -> ", post);
    currPost.value = post;
  } catch (ex) {
    //FALLBACK NEL CASO DI ERRORE
    const fallback = {
      title: ex,
      body: "Qualcosa è andato storto nella lettura dei dettagli del Post !",
    };
    currPost.value = fallback;
  }
};

//ESEMPIO DI WATCH DEI PARAMETRI DI ROUTE PER CARICARE I DATI
watchEffect(async () => {
  const postId = +route.params.id;
  console.info("CURR param postId=", postId);
  await fetchPostDetails(postId);
});

export function goBack() {
  router.back();
}
</script>
<style scoped>
.detail {
  background-color: white;
  color: var(--vue-blue, black);
}
p {
  font-size: 24px;
}
dl {
  text-align: left;
}
dt {
  font-size: 18px;
  font-weight: bold;
  color: var(--vue-green, green);
}
dd {
  font-size: 16px;
  color: var(--vue-blue, black);
}
</style>