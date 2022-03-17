<script lang="ts">
	import { onMount } from "svelte"

	import Tailwindcss from "./components/Tailwindcss.svelte";
	import ModeSwitcher from "./components/ModeSwitcher.svelte";

	import { walletStore,accounts_store,selected_account } from "./stores"
	
	import Start from "./components/Start.svelte"
	import Accounts from "./components/Accounts.svelte";
	import CreateAccount from "./components/CreateAccount.svelte";
	import Main from "./components/Main.svelte";
	import Transaction from "./components/Transaction.svelte";

	let dark:boolean =true;
	let loading = true

	let accounts = "";

	onMount(async () => {
		loading = true
		try{
	 	let accounts_return = await globalThis.api.accountsInFolder();
		console.log(accounts_return);
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



<main class="bg-gradient-to-br  flex items-center justify-center"
  class:dark
  class:from-blue-700={dark}
  class:to-purple-800={dark}
  class:from-yellow-200={!dark}
  class:to-pink-300={!dark}>
  
	<ModeSwitcher/>
	{#if $walletStore.state === 'not_started'}
		<Start {loading} />
	{:else if $walletStore.state === 'select_account'}
		<Accounts />
	{:else if $walletStore.state === 'create_account'}
		<CreateAccount />
	{:else if $walletStore.state === 'main'}
		<Main />
	{:else if $walletStore.state === 'in_transaction'}
		<Transaction />
	{/if}
	<footer>
		{$accounts_store}
		A tiny project by
		<a href="https://github.com/Javier747Belbruno" target="_blank">Javier747</a>, made with
		<a href="https://svelte.dev/" target="_blank">Svelte</a> and
		<a href="https://www.electronjs.org/" target="_blank">Electron</a>
	</footer>
</main>
<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
