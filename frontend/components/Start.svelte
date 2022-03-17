<script lang="ts">
	import { walletStore } from "../stores"

	export let loading: boolean
	
</script>

<div  >
	<h1 class="uppercase text-6xl leading-normal font-thin text-svelte"><span class="upper">Waterfly Wallet</span> </h1>
	<p>
		Bringing the  
		<span class="upper"> future </span> to your wallet
	</p>
	{#if loading}
		<div class="loading">
			<div class="loading-spinner"></div>
		</div>
		<div class="button"><button disabled>Loading Data...</button></div>
	{:else}
		<div class="button"><button on:click={() => walletStore.next()}>Let's start!</button></div>
	{/if}
</div>

