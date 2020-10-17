import { ref, reactive, watchEffect } from "./vue.esm-browser.js";

export default {
	template: `Welcome to {{ msg }}
            <hr />
            I'll talk about: {{about}} <button @click="choose">FAVORITE FW</button>
            <br />
            clock: {{ tick }} <button v-on:click="updateTime">UPD NOW</button>
            <br />
    A: <input v-model="tot.a" type="number" step="0.1"/> + B: {{tot.b}} =?= {{ tot.a+tot.b }} WTF
    `, //TODO: AGGIUNGERE v-model.number PER FIX ERRORE string + , mi spiace ma 0.1+0.2!=0.3 in JS i numeri sono double 64-bit IEEE754!
	data() {
		return {
			about: "Vue",
		};
	},
	computed: {
		msg() {
			return `XE FrameworkSPA - ${this.about.toUpperCase()} - ${timeUTC(new Date())}`;
		},
		tick() {
			console.log("..."); //3s tick
			return timeUTC(this.time); //COMPUTED CHE FORMATTA this.time <- ESPORTATO DA COMPOSITION API
		},
	},
	methods: {
		choose() {
			const frameworks = ["Angular", "Blazor", "Vue.js", "React"];
			this.about = frameworks[Math.floor(Math.random() * frameworks.length)];
		},
	},
	watch: {
		about: function (val, oldVal) {
			if (val.toLowerCase() === "react") alert("ANKA NO! MEJO " + oldVal);
		},
	},
	setup(props, ctx) {
		//LA NUOVA COMPOSITION API PUO' ESSERE USATA INSIEME ALLA "VECCHIA" OPTIONS API (backported Vue 2.x @vue/composition-api)
		const time = ref(new Date()); //EQUIVALE A data() PER DATI PRIMITIVI
		const tot = reactive({ a: 0.2, b: 0.1 }); // CON OGGETTI COMPLESSI
		const updateTime = () => (time.value = new Date()); //EQUIVALE A methods

		window.setInterval(updateTime, 3000);
		watchEffect(() => console.warn("TOTALE=", tot.a + tot.b, typeof tot.a));

		console.info("CONTROLLARE IN CONSOLE + PROVARE  myapp.tot.b=42"); //TODO
		return { tot, time, updateTime };
	},
};

/**
 * @param {Date} date
 */
function timeUTC(date) {
	return "@" + date.toISOString().substring(11); //hh:mm:ss.xxxZ
}
