<template>
  <MyCard w="50%" c="white">
    <template v-slot:head>
      <MyButton v-if="isLoggedIn" :text="logoutName" :info="$router" @do="doLogout($event.info)" />
      <header v-else>Enter your credential</header>
    </template>
    <form @submit.prevent="doLogin(frmValue, returnUrl, $router)">
      <my-input
        name="username"
        v-bind:value="frm.username.value"
        v-on:update="updField"
        required
      ></my-input>
      <MyInput
        name="password"
        :value="frm.password.value"
        @update="updField"
        type="password"
        required
        :minlength="4"
      />
      <br />
      <my-button v-on:click="goBack" text="🔙"></my-button> &nbsp;
      <MyButton type="submit" text="Login" background="green" />
    </form>
    <template v-slot:foot>
      <!-- <pre> VALID={{ !isInvalid }} FRM= {{ frm }} </pre> -->
    </template>
  </MyCard>
</template>

<script lang="ts">
// ESEMPIO SFC CON CLASSICHE option-api
import MyButton from "../toolbox/MyButton.vue";
import MyInput from "../toolbox/MyInput.vue";
import MyCard from "../toolbox/MyCard.vue";
import type { updateEvent } from "../toolbox/MyInput.vue";
import { Router /* useRouter */ } from "vue-router";
import { login, logout, logInOut, currUserId, Credentials } from "./auth-store";
import { computed } from 'vue';
type FormState<T> = {
  [K in keyof T]: { valid: boolean; value: T[K] };
};

export default {
  components: { MyButton, MyInput, MyCard },
  data() {
    return {
      frm: {
        username: { value: "", valid: false },
        password: { value: "", valid: false },
      } as FormState<Credentials>,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    updField(payload: updateEvent) {
      const field = payload.name.toLowerCase();
      this.frm[field].value = payload.value;
      this.frm[field].valid = !payload.errors.length; //VALID SE ARRAY VUOTO!
    },
  },
  computed: {
    isInvalid() {
      return Object.values(this.frm as FormState<Credentials>).some((f) => !f.valid);
    },
    frmValue() {
      let creds: Credentials = Object.entries(
        this.frm as FormState<Credentials>
      ).reduce((obj, [key, val]) => {
        obj[key] = val.value;
        return obj;
      }, {} as Credentials);
      // console.info("frmValue", creds);
      return creds;
    },
    returnUrl() {
      // console.info("CURR $route", this.$route);
      return this.$route.query?.returnUrl ?? "/"; 
      //OPPURE this.$router.currentRoute.value?.query?.returnUrl || "/";
    },
  },
  setup() {
    // const router = useRouter();
    const doLogout = (router: Router) => {
      logout();
      router.push("/");
    };

    const doLogin = (creds: Credentials, returnTo: string, router: Router) => {
      login(creds)
        .then(() => router.push({ path: returnTo }))
        .catch(alert);
    };

    return {
      doLogin,
      doLogout,
      isLoggedIn: currUserId,
      logoutName: logInOut
    };
  },
};
</script>

<style scoped>
button,
header {
  font-size: 1.5em;
}
</style>
