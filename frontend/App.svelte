<script lang="ts">
	import { onMount } from "svelte"

	import { walletStore,accounts_store,selected_account } from "./stores"
	import Start from "./components/Start.svelte"
	import Accounts from "./components/Accounts.svelte";
	import CreateAccount from "./components/CreateAccount.svelte";
	import Main from "./components/Main.svelte";

	let loading = true

	let accounts = "";

	onMount(async () => {
		loading = true
		try{
	 	let accounts_return = await globalThis.api.accountsInFolder();
		accounts = accounts_return;
		// save accounts names in store
		accounts_store.set(accounts)
		loading = false
		}catch(e){
			console.log(e)
			//show error screen pop up
			alert("Error: loading accounts Details: " + e)
		}
	})

</script>

<main>
	
    
	{#if $walletStore.state === 'not_started'}
		<Start {loading} />
	{:else if $walletStore.state === 'select_account'}
		<Accounts />
	{:else if $walletStore.state === 'in_transaction'}
		<Accounts />
	{:else if $walletStore.state === 'create_account'}
		<CreateAccount />
	{:else if $walletStore.state === 'main'}
		<Main />
	{/if}
	<footer>
		{$walletStore.state}
		{$accounts_store}
		{$selected_account}
		<br/>
		A weekend project by
		<a href="https://github.com/Javier747Belbruno" target="_blank">Javier747</a>, made with
		<a href="https://svelte.dev/" target="_blank">Svelte</a> and
		<a href="https://www.electronjs.org/" target="_blank">Electron</a>
	</footer>
</main>

<style>
	main {
		margin: auto;
		box-sizing: border-box;
		min-height: 500px;
		max-width: 550px;
		position: relative;
		padding-top: 40px;
		padding-bottom: 170px;
	}

	footer {
		color: rgb(68, 84, 233);
		position: absolute;
		bottom: 0;
		text-align: center;
		width: 100%;
	}
</style>
