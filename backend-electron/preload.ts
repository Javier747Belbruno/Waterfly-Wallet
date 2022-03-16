const { contextBridge, ipcRenderer } = require("electron")
//const { contextBridge, ipcRenderer } = require("electron")
const API = {
	//now I want to send something and recieve something
	//invoke has to return something.

	accountsInFolder: () => ipcRenderer.invoke("searchAccounts"),
	createAccount: (name, pass) => ipcRenderer.invoke("createAccount", name, pass),
	validateAccount: (name, pass) => ipcRenderer.invoke("validateAccount", name, pass),
	getBalance: (name, pass) => ipcRenderer.invoke("getBalance", name, pass),
	getNewOneAddress: (name, pass) => ipcRenderer.invoke("getNewOneAddress", name, pass),
	getAddressListFromTangle: (name, pass) => ipcRenderer.invoke("getAddressListFromTangle", name, pass),
	sendTransaction: (name, pass, address, amount) =>
		ipcRenderer.invoke("sendTransaction", name, pass, address, amount),
}

contextBridge.exposeInMainWorld("api", API)
