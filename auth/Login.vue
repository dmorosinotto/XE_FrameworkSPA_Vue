<template>
  <MyCard w="50%">
    <template v-slot:head>
      <MyButton v-if="logoutName" :text="logoutName" @click="logout($router)" />
      <header v-else>Enter your credential</header>
    </template>
    <form @submit.prevent="alert(frmValue)">
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
        :minlength="5"
      />
      <br /><my-button v-on:click="goBack" text="🔙"></my-button> &nbsp;
      <MyButton
        type="submit"
        text="Login"
        background="green"
        :info="frmValue"
        :disabled="isInvalid"
        @do="login($event.info, returnUrl, $router)"
      />
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
import { authStore as auth, Credentials } from "./auth-store";
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
    alert(what) {
      window.alert(JSON.stringify(what));
    },
    updField(payload: updateEvent) {
      const field = payload.name.toLowerCase();
      this.frm[field].value = payload.value;
      this.frm[field].valid = !payload.errors.length; //VALID SE ARRAY VUOTO!
    },
  },
  computed: {
    isInvalid() {
      return Object.values(this.frm as FormState<Credentials>).some(
        (f) => !f.valid
      );
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
      return this.$route.query?.returnUrl; //OPPURE this.$router.currentRoute.value?.query?.returnUrl;
    },
  },
  setup() {
    // const router = useRouter();

    const logout = (router: Router) => {
      auth.logout();
      router.push("/about");
    };

    const login = (creds: Credentials, returnTo: string, router: Router) => {
      auth
        .login(creds)
        .then(() => router.push({ path: returnTo }))
        .catch(alert);
    };

    return {
      login,
      logout,
      logoutName: auth.logoutName,
    };
  },
};
</script>

<style scoped>
button {
  font-size: 1.5em;
}
</style>
