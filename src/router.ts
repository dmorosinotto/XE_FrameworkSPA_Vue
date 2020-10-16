import { defineAsyncComponent, h } from "vue";
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import { default as MainMenu } from "./MainMenu.vue";
import { default as Login } from "./auth/Login.vue";
import { default as Posts } from "./posts/Posts.vue";
import { default as PostDetail } from "./posts/PostDetail.vue";
import { isLoggedIn } from "./auth/auth-store";

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
				{ path: "", redirect: "posts" },
				{
					name: "posts",
					path: "posts",
					component: Posts
				},
				{
					name: "direct-post",
					path: "post/:id/:slag?",
					component: PostDetail,
					//ESEMPIO ROUTEGUARD IN INGRESSO (PER VALIDARE AUTH -> REDIRECT login)
					beforeEnter: (to, from, next) => {
						if (!isLoggedIn()) {
							//FORZO IL REDIRECT ALLA LOGIN NEL CASO DI UTENTE NON AUTENTIFICATO
							return next({ path: "/login", query: { returnUrl: to.fullPath } });
						} else {
							//SE CHIAMO next() LA NAVIGAZIONE VIENE CONSENTITA
							next();
						}
					}
				}
			]
		},
		//GESTIONE ROUTE NOT FOUND CON DINAMICO (LAZY-LOAD) COMPONENT
		{
			name: "notfound",
			path: "/:pathMatch(.*)*",
			component: defineAsyncComponent(() => import("./lazy/404.vue")) //LAZY PAGE 404
		}, //RICORDARSI DI AVVIARE ANCHE npm run dev:basics
		{
			name: "reactivity",
			path: "/extra",
			component: {
				render: () => h("iframe", { src: "http://localhost:8080", width: "90%", height: "250px" })
			}
		}
	]
});
