//ESEMPIO BASICS REACTIVITY IN VUE
import { createApp } from "./vue.esm-browser.js";

import App from "./basics-options-composition-api.js";
window.myapp = createApp(App).mount("#basics");



//VOLENDO AVREI POTUTO USARE GLOBAL CDN <script src="https://unpkg.com/vue@next"></script> 
//VEDI DOCS: https://v3.vuejs.org/guide/installation.html#explanation-of-different-builds