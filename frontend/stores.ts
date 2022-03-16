import { get, writable } from "svelte/store"

export const accounts_store = writable("")
export const selected_account = writable("")
export const password_store = writable("")

type Wallet = {} & (NotStarted | LoadAccount | CreateAccount | InTransaction | Main)

interface NotStarted {
	state: "not_started"
}

interface LoadAccount {
	state: "select_account"
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
		createAccount() {
			update(wallet => {
				if (wallet.state === "select_account") {
					return { state: "create_account" }
				}
				return wallet
			})
		},
		confirmAccount(name_account) {
			update(wallet => {
				if (wallet.state === "create_account") {
					selected_account.set(name_account)
					return { state: "main" }
				}
				return wallet
			})
		},
		selectAccount(name_account) {
			update(wallet => {
				if (wallet.state === "select_account") {
					selected_account.set(name_account)
					return { state: "main" }
				}
				return wallet
			})
		},
		inTransaction() {
			update(wallet => {
				if (wallet.state === "main") {
					return { state: "in_transaction" }
				}
				return wallet
			})
		},
		next() {
			update(wallet => {
				switch (wallet.state) {
					case "not_started":
						return {
							state: "select_account",
						}
					case "select_account":
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
				}
			})
		},
		previous() {
			update(wallet => {
				switch (wallet.state) {
					case "create_account":
						return {
							state: "select_account",
						}
					case "main":
						return {
							state: "select_account",
						}
					case "in_transaction":
						return {
							state: "main",
						}
				}
			})
		},
	}
}
export const walletStore = createWalletStore()
