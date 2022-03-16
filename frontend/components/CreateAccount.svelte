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
        //validate name and pass is not blank
        if(nameAccount.length > 0 && password.length > 0){
            
            // validate name is not inside array accounts_store
            //create and array from accounts_store divided by blancks
            let array_accounts = $accounts_store.toString().toUpperCase().split(",");
            console.log(array_accounts);
            //validate name is not inside array_accounts , uppercase and lowercase

            if(array_accounts.indexOf(nameAccount.toUpperCase()) === -1){
                try{    
                    accountToTangle();
                }catch(e){
                    console.log(e)
                    alert("Error: loading accounts Details: " + e)
                }
            }else{
                alert("Account name already exists")
            }
        }else{
            alert("Please enter a name and password");
        }
    }

    function confirmAccount(){
        accounts_store.set(accounts_store + "," + nameAccount);
        walletStore.confirmAccount(nameAccount)
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
                <button on:click={confirmAccount}>Continue</button>
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