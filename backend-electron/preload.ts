const { contextBridge, ipcRenderer } = require("electron")
//const { contextBridge, ipcRenderer } = require("electron")
const API = {
	//now I want to send something and recieve something
	//invoke has to return something.

	accountsInFolder: () => ipcRenderer.invoke("searchAccounts"),
	createAccount: (name, pass) => ipcRenderer.invoke("createAccount", name, pass),
}

contextBridge.exposeInMainWorld("api", API)
