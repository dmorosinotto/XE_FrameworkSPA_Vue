import { defineAsyncComponent, h } from "vue"; //"vue/dist/vue.esm-browser.js"; //FIX PER PROBLEMA TEMPORANEO DI Vite
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"; //"vue-router/dist/vue-router.esm.js" //FIX PER PROBLEMA TEMPORANEO DI Vite
import { default as MainMenu } from "./MainMenu.vue";
import { default as Login } from "./auth/Login.vue";
import { default as Posts } from "./posts/Posts.vue";
import { default as PostDetail } from "./posts/PostDetail.vue";
import { authStore } from "./auth/auth-store";

export const router = createRouter({
	history: createWebHistory(), // createWebHashHistory("/same/mount/baseurl/")
	routes: [
		{ name: "login", path: "/login", component: Login },
		{
			name: "root",
			path: "/",
			component: MainMenu,
			//ESEMPIO DI NESTED ROUTES CONFIG
			children: [
				{
					name: "posts",
					path: "posts",
					component: Posts,
				},
				{
					name: "direct-post",
					path: "post/:id/:slag?",
					component: PostDetail,
				}, //RICORDARSI DI AVVIARE ANCHE npm run basics
				{ path: "", component: { render: ()=>h("iframe", {
						src: "http://localhost:8080",
						width: "90%",
						height: "250px",
					})}
				},
			],
			//ESEMPIO ROUTEGUARD IN INGRESSO (PER VALIDARE AUTH -> REDIRECT login)
			beforeEnter: (to, from, next) => {
				if (from.fullPath === "/about" && to.name.toString().includes("post")) {
					console.error("NAVIGAZIONE DA about -> *post* NON CONSENTITA");
					next(false); // ANNULLA LA NAVIGAZIONE RESTA DOVE SONO
				} else if (!authStore.isLoggedIn()) {
					//FORZO IL REDIRECT ALLA LOGIN NEL CASO DI UTENTE NON AUTENTIFICATO
					return next({ path: "/login", query: { returnUrl: to.fullPath } });
				} else {
					next(); //SE CHIAMO next() LA NAVIGAZIONE VIENE CONSENTITA
				}
			},
		},

		{ name: "about", path: "/about", component: defineAsyncComponent(() => import("./lazy/About.vue")) }, //LAZY ABOUT
		{ name: "notfound", path: "/:pathMatch(.*)*", component: defineAsyncComponent(() => import("./lazy/404.vue")) }, //LAZY PAGE 404
	],
});
