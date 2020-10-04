import { reactive, computed } from "vue";
import { Info, readINFOS, saveINFOS } from "./local-infos";

const baseapi = "https://jsonplaceholder.typicode.com";

export interface Post {
	id: number;
	title: string;
	body: string;
	info: Info; // { likes: number, hashtags: string[] }
}

//CLASSE CHE FA DA CONTENITORE DELLO STATO (currHashtag SHARED STATE) + LOGICHE PER MANIPOLARLO
class PostStore {
	private state: { posts: Post[]; currHashtag?: string };
	constructor() {
		this.state = reactive({ posts: [], currHashtag: "" }); //NOTARE UTILIZZO API DI Reactivity System DI VUE
	}

	//LOGICA DI CARICAMENTO DEI DATI POSTS + INFOS IN BASE ALL'UTENTE CORRENTE -> authStore.userId
	async fetchPostsForUser(userId?: number) {
		try {
			//LEGGO I DATI DEI POSTS DALLA API PUBBLICA
			const api = userId ? `${baseapi}/posts?userId=${userId}` : `${baseapi}/posts`;
			const res = await window.fetch(api);
			const posts = (await res.json()) as Post[];
			//LEGGO LE INFOS (Likes+Tags) DAL localStorage
			const infos = readINFOS(userId);
			this.state.posts = posts.map((p) => {
				p.info = infos ? infos[String(p.id)] : { hashtags: ["FAKE"], likes: 0 }; //AGGANCIO likes + hashtags AI DATI DEL POST
				return p;
			});
			return true;
		} catch (ex) {
			const error = `ERROR LOADING POSTS FOR ${userId}`;
			console.error(error, ex);
			this.state.posts = [];
			throw error;
			return false;
		}
	}

	saveLikesForUser(userId?: number) {
		const INFOS: Record<string, Info> = this.state.posts.reduce((infos, p) => {
			//ESTRAGGO LA MAPPATURA [postId] -> info { likes, hashtags }
			infos[String(p.id)] = p.info;
			return infos;
		}, {});
		//SALVO LE PREFERENZE DELL'UTENTE SU localStorage
		saveINFOS(INFOS, userId);
	}

	//LOGICA DI QUERY -> GETTERS ESTRATTA DA App.vue E CENTRALIZZATA NELLO STORE
	private _filterPosts = computed(() => {
		// const tag = currHashtag.value; // GESTIONE CLASSICA setHashtag FATTA CON EVENTI + currHashtag LOCALE
		const tag = this.state.currHashtag.toLowerCase();
		return tag
			? this.state.posts.filter((p) => p.info.hashtags.some((t) => t.toLowerCase().includes(tag)))
			: this.state.posts;
	});
	get filterPosts() {
		return this._filterPosts;
	}

	//LOGICA DI QUERY -> GETTERS ESTRATTA DA App.vue E CENTRALIZZATA NELLO STORE
	private _currHashtag = computed(() => postStore.state.currHashtag);
	get currHashtag() {
		return this._currHashtag;
	}

	//LOGICA DI COMMAD -> METODI X MANIPOLAZIONE setHashtag PER EVITARE BUBBLE UP EVENTI, COMUNICAZIONE DIRETTA: hashtag => store => App
	setHashtag(tag: string) {
		this.state.currHashtag = tag;
	}

	//LOGICA DI COMMAND -> METODO X INCREMENTO DEI LIKE (USATA DA PostCtrl => App) - POTEVO ANCHE FARLA INVOCAR DIRETTAMENTE SENZA EVENTO @like
	incrementLike(info: Info, postId: number) {
		//const post = this.state.posts.find((p) => p.id === postId); post.info.likes++; //MODO CLASSICO VERBOSO
		info.likes += 1; //MA FUNZIONA DIRETTAMENTE ANCHE COSI' PERCHE' reactive TRACCIA TRAMITE Proxy MODIFICHE A REFERENZE!
	}
}

// ISTANZA CONDIVISA DI STORE (currHashtag SHARED STATE) CHE CONSENTE COMUNICAZIONE "DIRETTA" TRA DIVERSI COMPONENTI SENZA RIMPALLO CLASSICO FLUSSO In-prop/Out-event
export const postStore = new PostStore();
