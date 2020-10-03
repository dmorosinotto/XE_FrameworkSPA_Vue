/*
//ESEMPIO BASICS REACTIVITY IN VUE
import { createApp } from "vue/dist/vue.esm-browser.js";

import App from "./basics-reactivity-options-composition-api.js";
window.myapp = createApp(App).mount("#app");
*/

//ESEMPIO DI APPLICAZIONE CON SFC TS
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";

window.myapp = createApp(App).use(router).mount("#app");
