import { get, writable } from "svelte/store"

type Wallet = {} & (NotStarted | LoadAccount | CreateAccount | InTransaction | Main)

interface NotStarted {
	state: "not_started"
}

interface LoadAccount {
	state: "load_account"
}

interface CreateAccount {
	state: "create_account"
}

interface InTransaction {
	state: "in_transaction"
}

interface Main {
	state: "main"
}

function createWalletStore() {
	const { subscribe, update, set } = writable<Wallet>({
		state: "not_started",
	})
	return {
		subscribe,
		set,
		next() {
			update(g => {
				switch (g.state) {
					case "not_started":
						return {
							state: "load_account",
						}
					case "load_account":
						return {
							state: "main",
						}
					case "create_account":
						return {
							state: "main",
						}
					case "in_transaction":
						return {
							state: "main",
						}
					case "main":
						return {
							state: "in_transaction",
						}
				}
			})
		},
	}
}
export const walletStore = createWalletStore()
