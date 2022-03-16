<script lang="ts">

    import { walletStore,accounts_store,selected_account } from "../stores";

    let accounts = "";
    accounts_store.subscribe(value => {
		accounts = value;
	});

   

</script>


    <h1> Accounts</h1>
    <br/>
    <h3> 
        {#each accounts as ac}
               <div class="button"> <button on:click={() => walletStore.selectAccount(ac)}>{ac}</button>  </div> <br/>
        {/each} 
            <div class="button"><button on:click={() => walletStore.createAccount()}>+</button></div>
    </h3> 


   



<style>
	h1,h3{
		text-align: center;
	}
    .button {
		text-align: center;
	}
</style>