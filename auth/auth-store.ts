import { reactive, computed } from "vue";

type AuthState = {
	userId?: number;
	userName: string | null;
};

//CLASSE CHE FA DA CONTENITORE DELLO STATO DI AUTENTIFICAZIONE + LOGICHE PER MANIPOLARLO
class AuthStore {
	public state: AuthState;
	constructor() {
		this.state = reactive({ userName: null }); //NOTARE UTILIZZO API Reactivity
	}

	//LOGICA DI QUERY -> METODO PER VERIFICARE SE L'UTENTE E' LOGGATO - DA RICHIAMARE PER VALUTARE
	isLoggedIn() {
		console.log("LOGGED ", !!this.state.userId);
		return !!this.state.userId;
	}

	// LOGICA DI QUERY -> GETTERS PER AVERE LOGIN/LOGOUT+UTENTE CORRENTE UTILIZZANDO COMPUTED Reactivity
	private _linkName = computed(() => (!this.state.userId ? "LOGIN" : `LOGOUT ${this.state.userName}`));
	get linkName() {
		return this._linkName;
	}

	//LOGICA DI COMMAD -> METODI PER ESEGUIRE IL LOGIN => VERIFICA CREDENZIALI => MODIFICA STATE
	login(userName: string, password: string): Promise<boolean> {
		if (password && userName.toLowerCase() === password.toLowerCase()) {
			//FAKE LOGIC DI VERIFICA UTENTE
			this.state.userName = userName;
			this.state.userId = userName.length;
			return Promise.resolve(true);
		} else {
			this.logout();
			return Promise.reject("CREDENZIALI NON VALIDE");
		}
	}

	//LOGICA DI COMMAND -> METODO PER ESEGUIRE IL LOGOUT => SBIANCA STATE
	logout() {
		this.state.userId = void 0; //undefined
		this.state.userName = null;
	}
}

// ISTANZA CONDIVISA DI STORE CHE MANTIENE LO STATO DELL'AUTENTIFICAZIONE PER L'INTERA APPLICAZIONE USATA DAI VARI COMPONENTI + ROUTER
export const authStore = new AuthStore();
