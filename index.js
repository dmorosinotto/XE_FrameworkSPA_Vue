import { createApp, ref } from "vue/dist/vue.esm-browser.js";
window.myapp = createApp({
	setup() {
		const msg = ref("XE Vue");
		return { msg };
	},
}).mount("#app");
