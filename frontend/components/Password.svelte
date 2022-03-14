<script>
    import { bind } from "svelte/internal";

import { walletStore } from "../stores";


    let something = "";
    const getUsage = async () => {
    let usage = await window.api.sendPromise("hello");
    console.log(usage);
    something = usage.id;
    
    };
   
  

</script>
    <input type="text" bind:value={something} />
    <button on:click={getUsage}>Get Usage Memomry</button>
<h1> Password</h1>
{$walletStore.state}

<style>
	h1{
		text-align: center;
	}
</style>