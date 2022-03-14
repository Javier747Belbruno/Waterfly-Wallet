const { contextBridge, ipcRenderer } = require("electron")
//const { contextBridge, ipcRenderer } = require("electron")
const API = {
	//now I want to send something and recieve something
	//invoke has to return something.
	sendPromise: msg => ipcRenderer.invoke("promise-msg", msg),
	accountsInFolder: () => ipcRenderer.invoke("searchAccounts"),
}

contextBridge.exposeInMainWorld("api", API)
