<script lang="ts">
	import { onMount } from "svelte"

	import { walletStore } from "./stores"
	import Start from "./components/Start.svelte"
import Password from "./components/Password.svelte";

	let loading = true

	let accounts = "";

	onMount(async () => {
		loading = true
		 let accounts_return = await globalThis.api.accountsInFolder();
		console.log(accounts_return);
		accounts = accounts_return;
		loading = false
		// save accounts in walletStore
		//walletStore.set({ accounts })
	})

</script>

<main>
	
    
	{#if $walletStore.state === 'not_started'}
		<Start {loading} />
		 <input type="text" bind:value={accounts} />
		{$walletStore.state}
	{:else if $walletStore.state === 'load_account'}
		<Password />
	{:else if $walletStore.state === 'in_transaction'}
		<Password />
	{/if}
	<footer>
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
