import { h, defineComponent, VNodeNormalizedChildren } from "vue";
import { RouterLink } from "vue-router";

// ESEMPIO DI COMPONENTE VUE CHE IMPLEMENTA DIRETTAMENTE render function
// VEDI DOCS: https://v3.vuejs.org/guide/render-function.html#render-functions

const PostHSlag = defineComponent({
	render() {
		// create kebab-case id from the text contents of the children
		const slag = this.title.toLowerCase()
			.replace(/\W+/g, "-") // replace non-word characters with dash
			.replace(/(^-|-$)/g, ""); // remove leading and trailing dashes

		return h("h" + (this.level || 1), { style: { "text-transform": this.level ? "capitalize" : "uppercase" } }, [
			h(
				RouterLink,
				{
					to: "/post/" + this.pid + "/" + slag,
				},
				this.title
			),
		]);
	},
	props: {
		level: {
			type: Number,
			required: true,
		},
		pid: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			default: "Hello world"
		}
	},
});

export default PostHSlag;
