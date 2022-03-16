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
	})

	win.loadFile(join(__dirname, "../public/index.html"))
	win.once("ready-to-show", () => {
		win.show()
	})
}

/******************************************************/
async function getNameFoldersInDataFolder() {
	const fs = require("fs")
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

	console.log("createAccount", name, pass)
	const manager = new AccountManager({
		storagePath: "./data-waterfly/" + name,
	})

	try {
		manager.setStrongholdPassword(pass)
		let account
		try {
			account = manager.getAccount(name)
		} catch (e) {
			console.log("Couldn't get account, creating a new one")
		}

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
			console.log("Account created:", account.id())
		}

		const synced = await account.sync()
		console.log("Synced account", synced)
		return synced
	} catch (error) {
		console.log("Error: " + error)
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
	console.log("validateAccount", name, pass)

	const { AccountManagerForMessages } = require("@iota/wallet")

	const manager = new AccountManagerForMessages({
		storagePath: "./data-waterfly/" + name,
	})

	try {
		console.log("wait pass")
		await manager.setStrongholdPassword(pass)
		console.log("Password is correct")
		const account = await manager.getAccount(name)
		console.log("Account:", account)

		// Always sync before doing anything with the account
		//const synced = await account.sync()
		//console.log("Syncing... - ", synced)

		return { result: true, msg: "Sucess" }
	} catch (error) {
		console.log("Error:", error)
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

/***************************************** */
async function getBalance(name, pass) {
	console.log("Balance", name, pass)

	const { AccountManagerForMessages } = require("@iota/wallet")

	const manager = new AccountManagerForMessages({
		storagePath: "./data-waterfly/" + name,
	})

	try {
		console.log("wait pass")
		await manager.setStrongholdPassword(pass)
		console.log("Password is correct")
		const account = await manager.getAccount(name)
		console.log("Account:", account)

		// Always sync before doing anything with the account
		const synced = await account.sync()
		console.log("Syncing... - ", synced)

		const balance = await account.balance()

		console.log("Available balance", balance)

		return { result: true, msg: balance }
	} catch (error) {
		console.log("Error:", error)
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
