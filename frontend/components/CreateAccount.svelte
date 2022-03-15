<script lang="ts">
  
    import { walletStore,accounts_store,selected_account } from "../stores";

    let nameAccount = "";
    let password = "";
    let return_data_account: any;
    let data = "";
    let state: string = "";

    async function accountToTangle(){
        state = "loading";
	 	return_data_account = await globalThis.api.createAccount(nameAccount,password);
        state = "response";
        if(return_data_account.id){
            data =  return_data_account.id;
        }else{
            data =  JSON.stringify(return_data_account);
        }
    }

    function createAccount() {
        
        try{    
            accountToTangle();
        }catch(e){
			console.log(e)
			alert("Error: loading accounts Details: " + e)
		}
    }

</script>

    <h1> Create Account</h1>
     <br/>
     {state}
     <br/>
	{#if state == "loading"}
		<h2>Waiting...</h2>
	{:else}
        {#if state == "response"}
            {data}
            <br/>
            <div class="button">
                <button on:click={() => walletStore.confirmAccount(nameAccount)}>Continue</button>
            </div>
        {:else}
        <h3>
            Name Account:<input type="text" bind:value={nameAccount}>
            <br/>
            Password<input type="text" bind:value={password}>
            <br/>
            <button on:click={createAccount}>Create</button>
        </h3>
        {/if}
	{/if}
  


<style>
	h1,h2,h3{
		text-align: center;
	}
    .button {
		text-align: center;
	}
</style>