<script lang="ts">
import { to_number } from "svelte/internal";


    import { walletStore,accounts_store,selected_account,password_store } from "../stores";

    import AddressesComponent from "./Addresses.svelte";
    import Balance from "./Balance.svelte";

    //let balance = "";
    let password = "";
    let state: String = "main";

    
    async function validatePassword(){
        state = "loading";
        if(password.length > 0){
            let return_data_account = await globalThis.api.validateAccount($selected_account,password);
              if(return_data_account.result){
                password_store.set(password);
             }
             else{
                 alert(return_data_account.msg);
                }
        }else{
            alert("Please enter a password");
        }
        state = "main";
    }

    function goBackToAccountMenu(){
        password_store.set("");
        selected_account.set("");
        walletStore.previous();
    }

    

</script>

   
    <h1> Main - {$selected_account} Account</h1>
    <br/>
    {#if state == "main" && $password_store.length <= 0}
        <h3>
            Enter password: <input type="password"  bind:value={password} />
            <br/>
            <button on:click={validatePassword}>Next </button>
        </h3>
        <button on:click={() => walletStore.previous()}>Back</button>
    {:else if state == "main" && $password_store.length > 0}
    <button on:click={() => walletStore.inTransaction()}>Send Iotas</button>
    <Balance />
    <AddressesComponent/>
    <br/>
    <br/>
    <br/>
    <button on:click={goBackToAccountMenu}>Back to Accounts Menu</button>
      {:else if state == "loading"}
            <h2>Waiting...</h2>

      {/if}

     
     
  


<style>
	h1,h3{
		text-align: center;
	}
    .button {
		text-align: center;
	}
</style>