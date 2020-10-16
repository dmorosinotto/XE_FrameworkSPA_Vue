import { h, defineComponent, VNodeNormalizedChildren } from "vue";
import { RouterLink } from "vue-router";

// ESEMPIO DI COMPONENTE VUE CHE IMPLEMENTA DIRETTAMENTE render function
// VEDI DOCS: https://v3.vuejs.org/guide/render-function.html#render-functions

const PostHSlag = defineComponent({
	render() {
		//CALCOLA SLAG IN BASE AL TITOLO DEL POST
		const slag = this.title
			.toLowerCase()
			.replace(/\W+/g, "-") // replace non-word characters with dash
			.replace(/(^-|-$)/g, ""); // remove leading and trailing dashes

		//OGNI 6 LIKE SCALA DI UN LIVELLO: 0-5->h6 ; 6-12->h5 ; ... ;  30-35->h1 ; >=36 -> h0 ossia H1 + UPPECASE (text-transform: uppercase)
		const level = this.likes >= 42 ? 0 : 6 - Math.floor(this.likes / 6);
		console.log("CALCOLA H", this.likes, "->", level);

		//RENDER FUNCTION -> GENERA HTML TAG/STYLE DINAMICAMENTE - POTREI USARE ANCHE TSX...
		return h("h" + (level || 1), { style: { "text-transform": level ? "capitalize" : "uppercase" } }, [
			h(RouterLink, { to: "/post/" + this.pid + "/" + slag }, this.title)
		]);
	},
	props: {
		likes: {
			type: Number,
			required: true
		},
		pid: {
			type: Number,
			required: true
		},
		title: {
			type: String,
			default: "Hello world"
		}
	}
});

export default PostHSlag;
