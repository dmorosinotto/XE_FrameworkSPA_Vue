import { reactive, computed } from "vue";

interface AuthState {
	userId?: number;
	userName: string | null;
}

export type Credentials = { username: string; password: string };

//ESPONGO UNA COSTANTE NON REACTIVE USATA DA TUTTO APPLICATIVO
export const BASEAPI = "https://jsonplaceholder.typicode.com";

//ESEMPIO DI "STATE MANAGEMENT" REALIZZATO CON LE FUNZIONALITA' DEL ReactivitySystem

//USO UN OGGETTO (privato) REACTIVE COME CONTENITORE DELLO STATO DI AUTENTIFICAZIONE
const _state: AuthState = reactive({ userName: null, userId: undefined });
//+ ESPONGO LE LOGICHE PER LEGGERE (aka query) E MANIPOLARE LO STATO (aka comand)

//COMPUTED PER AVERE IL VALORE DELL'UTENTE CORRENTE o 0 -> USATO DA Posts PER CARICARE I DATI -> fetchPostsForUser()
export const currUserId = computed(() => _state.userId || 0);

//COMPUTED PER AVERE SCRITTA LOGIN/LOGOUT+UTENTE CORRENTE UTILIZZA COMPUTED Reactivity -> USATO IN MainMenu.vue
export const logInOut = computed(() => (!_state.userId ? "LOGIN" : `LOGOUT 👤  ${_state.userName}`));

//METODO PER VERIFICARE SE L'UTENTE E' LOGGATO O MENO - RICHIAMATO DA LOGICA Guard in router.ts
export function isLoggedIn() {
	return currUserId.value > 0;
}

//METODO PER ESEGUIRE IL LOGIN => VERIFICA CREDENZIALI => MODIFICA STATE
export async function login({ username, password }: Credentials): Promise<boolean> {
	try {
		//FAKE ASYNC LOGIC DI VERIFICA UTENTE
		if (username && password) {
			const api = `${BASEAPI}/users?username=${username}`;
			const res = await window.fetch(api);
			if (res.ok) {
				const user = await res.json();
				if (user.length) {
					_state.userName = user[0].name;
					_state.userId = user[0].id;
					return Promise.resolve(true);
				} else throw "UTENTE NON TROVATO";
			} else throw "CREDENZIALI NON VALIDE";
		} else throw "SPECIFICARE CREDENZIALI";
	} catch (err) {
		logout();
		return Promise.reject(err);
	}
}

//METODO PER ESEGUIRE IL LOGOUT => SBIANCA STATE
export function logout() {
	_state.userId = void 0; //undefined
	_state.userName = null;
}
