<script lang="ts">

    import { walletStore,accounts_store,selected_account } from "../stores";

    let accounts = "";
    accounts_store.subscribe(value => {
		accounts = value;
	});


    let something = "";
    const getUsage = async () => {
    let usage = await globalThis.api.sendPromise("hello");
    console.log(usage);
    something = usage.id;
    
    };
   

</script>


    <h1> Accounts</h1>
    <h2> 
        {#each accounts as ac}
               <div class="button"> <button on:click={() => walletStore.selectAccount(ac)}>{ac}</button>  </div>
        {/each} 
            <div class="button"><button on:click={() => walletStore.createAccount()}>+</button></div>
    </h2> 

    <input type="text" bind:value={something} />
    <button on:click={getUsage}>Get Usage Memomry</button>
   



<style>
	h1,h2{
		text-align: center;
	}
    .button {
		text-align: center;
	}
</style>