<script lang="ts">
	import { walletStore } from "../stores"

	export let loading: boolean
</script>

<div>
	<h1><span class="upper">Waterfly Wallet</span> </h1>
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

<style>
	h1{
		text-align: center;
	}
	p {
		margin-top: 60px;
		margin-bottom: 60px;
	}
	.button {
		text-align: center;
	}

	.upper {
		font-weight: bold;
		border-bottom: 2px solid rgb(57, 47, 201);
	}
</style>
