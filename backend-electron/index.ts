const { app, BrowserWindow, ipcMain } = require("electron")
const { join } = require("path")

app.on("ready", async () => {
	await main()
})

async function main() {
	const win = new BrowserWindow({
		width: 700,
		height: 600,
		autoHideMenuBar: true,
		webPreferences: {
			preload: join(__dirname, "./preload.ts"),
		},
		contextIsolation: true,
		nodeIntegration: false,
	})

	win.loadFile(join(__dirname, "../public/index.html"))
	win.once("ready-to-show", () => {
		win.show()
	})

	win.webContents.on("new-window", function (e, url) {
		e.preventDefault()
		require("electron").shell.openExternal(url)
	})
}

/******************************************************/
async function getNameFoldersInDataFolder() {
	const fs = require("fs")
	//if doesn't exist folder data-waterfly create it
	if (!fs.existsSync("./data-waterfly")) {
		fs.mkdirSync("./data-waterfly")
	}

	// only folders,not files
	const folders = fs
		.readdirSync("./data-waterfly")
		.filter(file => fs.lstatSync("./data-waterfly/" + file).isDirectory())
	return folders
}

ipcMain.handle("searchAccounts", async (event, args) => {
	let result = await getNameFoldersInDataFolder()

	if (result) {
		if (result instanceof Promise) {
			return await result
		}
		return result
	}
})
/******************************************************/

async function createAccount(name, pass) {
	const { AccountManager, SignerType } = require("@iota/wallet")

	const manager = new AccountManager({
		storagePath: "./data-waterfly/" + name,
	})

	try {
		manager.setStrongholdPassword(pass)
		let account
		try {
			account = manager.getAccount(name)
		} catch (e) {}

		// Create account only if it does not already exist
		if (!account) {
			manager.storeMnemonic(SignerType.Stronghold)
			account = manager.createAccount({
				clientOptions: {
					node: { url: "https://api.lb-0.h.chrysalis-devnet.iota.cafe" },
					localPow: true,
				},
				alias: name,
			})
		}

		const synced = await account.sync()
		return synced
	} catch (error) {
		return error
	}
}

ipcMain.handle("createAccount", async (event, name, password) => {
	let result = await createAccount(name, password)

	if (result) {
		if (result instanceof Promise) {
			return await result
		}

		return result
	}
})

/***************************************** */
async function validateAccount(name, pass) {
	const { AccountManagerForMessages } = require("@iota/wallet")

	const manager = new AccountManagerForMessages({
		storagePath: "./data-waterfly/" + name,
	})

	try {
		await manager.setStrongholdPassword(pass)

		const account = await manager.getAccount(name)

		// Always sync before doing anything with the account
		//const synced = await account.sync()

		return { result: true, msg: "Sucess" }
	} catch (error) {
		return { result: false, msg: "Error: " + error }
	}
}

ipcMain.handle("validateAccount", async (event, name, password) => {
	let result = await validateAccount(name, password)

	if (result) {
		if (result instanceof Promise) {
			return await result
		}

		return result
	}
})

/**************************************************/
async function getBalance(name, pass) {
	const { AccountManagerForMessages } = require("@iota/wallet")

	const manager = new AccountManagerForMessages({
		storagePath: "./data-waterfly/" + name,
	})

	try {
		await manager.setStrongholdPassword(pass)
		const account = await manager.getAccount(name)

		// Always sync before doing anything with the account
		const synced = await account.sync()

		const balance = await account.balance()

		return { result: true, msg: balance }
	} catch (error) {
		return { result: false, msg: "Error: " + error }
	}
}

ipcMain.handle("getBalance", async (event, name, password) => {
	let result = await getBalance(name, password)

	if (result) {
		if (result instanceof Promise) {
			return await result
		}

		return result
	}
})
/*********************************************** */
async function getNewOneAddress(name, pass) {
	try {
		const { AccountManager, SignerType } = require("@iota/wallet")
		const manager = new AccountManager({
			storagePath: "./data-waterfly/" + name,
		})
		manager.setStrongholdPassword(pass)
		manager.storeMnemonic(SignerType.Stronghold)

		const account = manager.getAccount(name)

		// Always sync before doing anything with the account
		await account.sync()

		const address = account.generateAddress()
		return { result: true, msg: address }
	} catch (error) {
		return { result: false, msg: "Error: " + error }
	}
}

ipcMain.handle("getNewOneAddress", async (event, name, password) => {
	let result = await getNewOneAddress(name, password)

	if (result) {
		if (result instanceof Promise) {
			return await result
		}

		return result
	}
})

/***************************************************** */
async function getAddressListFromTangle(name, pass) {
	try {
		const { AccountManager, SignerType } = require("@iota/wallet")
		const manager = new AccountManager({
			storagePath: "./data-waterfly/" + name,
		})
		manager.setStrongholdPassword(pass)
		manager.storeMnemonic(SignerType.Stronghold)

		const account = manager.getAccount(name)

		// Always sync before doing anything with the account
		await account.sync()

		const addresses = account.listAddresses()

		let addresses_list = []

		addresses.forEach(a => {
			addresses_list.push(a.address)
		})

		return { result: true, msg: addresses_list }
	} catch (error) {
		return { result: false, msg: "Error: " + error }
	}
}

ipcMain.handle("getAddressListFromTangle", async (event, name, password) => {
	let result = await getAddressListFromTangle(name, password)

	if (result) {
		if (result instanceof Promise) {
			return await result
		}

		return result
	}
})
/******************************************************** */

async function sendTransaction(name, pass, address, amount) {
	const { AccountManagerForMessages } = require("@iota/wallet")

	const manager = new AccountManagerForMessages({
		storagePath: "./data-waterfly/" + name,
	})

	try {
		await manager.setStrongholdPassword(pass)

		const account = await manager.getAccount(name)

		// Always sync before doing anything with the account
		const synced = await account.sync()

		const response = await account.send({
			address,
			amount,
			remainder_value_strategy: {
				strategy: "ReuseAddress",
			},
		})

		return { result: true, msg: response }
	} catch (error) {
		return { result: false, msg: "Error: " + error }
	}
}

ipcMain.handle("sendTransaction", async (event, name, password, address, value) => {
	let result = await sendTransaction(name, password, address, value)

	if (result) {
		if (result instanceof Promise) {
			return await result
		}

		return result
	}
})
