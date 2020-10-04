import { reactive, computed } from "vue";

interface AuthState {
	userId?: number;
	userName: string | null;
}

export type Credentials = { username: string; password: string };

//CLASSE CHE FA DA CONTENITORE DELLO STATO DI AUTENTIFICAZIONE + LOGICHE PER LEGGERE (//QUERY:) E MANIPOLARLO (//COMMAND:)
class AuthStore {
	private state: AuthState;
	constructor() {
		this.state = reactive({ userName: null }); //NOTARE UTILIZZO API Reactivity
	}

	//QUERY: METODO PER VERIFICARE SE L'UTENTE E' LOGGATO O MENO - RICHIAMATO DA LOGICA Guard in router.ts
	isLoggedIn(): boolean {
		return !!this.state.userId;
	}

	//QUERY: GETTER PER AVERE IL VALORE DELL'UTENTE CORRENTE o 0 -> USATO DA Posts PER CARICARE I DATI -> fetchPostsForUser()
	get currUserId(): number {
		return this.state.userId || 0;
	}

	//QUERY: GETTERS PER AVERE LOGOUT+UTENTE CORRENTE UTILIZZANDO COMPUTED Reactivity -> USATO IN Login.vue
	private _logoutName = computed(() => (!this.state.userId ? "" : `LOGOUT 👤  ${this.state.userName}`));
	get logoutName() {
		return this._logoutName;
	}

	//COMMAD: METODO PER ESEGUIRE IL LOGIN => VERIFICA CREDENZIALI => MODIFICA STATE
	login({ username, password }: Credentials): Promise<boolean> {
		if (password && username.toLowerCase() === password.toLowerCase()) {
			//FAKE ASYNC LOGIC DI VERIFICA UTENTE
			this.state.userName = username;
			this.state.userId = username.length;
			return Promise.resolve(true);
		} else {
			this.logout();
			return Promise.reject("CREDENZIALI NON VALIDE");
		}
	}

	//COMMAND: METODO PER ESEGUIRE IL LOGOUT => SBIANCA STATE
	logout() {
		this.state.userId = void 0; //undefined
		this.state.userName = null;
	}
}

// ISTANZA CONDIVISA DI STORE CHE MANTIENE LO STATO DELL'AUTENTIFICAZIONE PER L'INTERA APPLICAZIONE USATA DAI VARI COMPONENTI + ROUTER
export const authStore = new AuthStore();
