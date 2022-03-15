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
