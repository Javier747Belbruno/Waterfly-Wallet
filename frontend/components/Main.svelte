<script lang="ts">

    import { walletStore,accounts_store,selected_account,password_store } from "../stores";

    let balance;
    let password = "";
    let state = "initial";

    
    async function validatePassword(){
        if(password.length > 0){
            password_store.set(password);
            state = "loading";
            let return_data_account = await globalThis.api.validateAccount($selected_account,$password_store);
              if(return_data_account.result){
                state = "main";
             }
             else{
                 alert(return_data_account.msg);
                    state = "initial";
                }
        }else{
            alert("Please enter a password");
        }
    }

    async function getBalanceFromTangle(){
        state = "loading";
        let return_data_balance = await globalThis.api.getBalance($selected_account,$password_store);
        if(return_data_balance.result){
                balance = JSON.stringify(return_data_balance.msg.payload.total);
                state = "main";
        }
        else{
        alert(return_data_balance.msg);
        state = "initial";
    }
        
    }

</script>

   
    <h1> Main - {$selected_account} Account</h1>
     <br/>
      {#if state == "initial"}
      <h3>
        Enter password: <input type="text"  bind:value={password} />
        <br/>
        <button on:click={validatePassword}>Next </button></h3>
        
      {:else if state == "loading"}
            <h2>Waiting...</h2>
        {:else if state == "main"}
            <h2>Balance: {balance} iotas</h2>
            <button on:click={getBalanceFromTangle}>Check Balance</button>

      {/if}

     
     
   


<style>
	h1,h3{
		text-align: center;
	}
    .button {
		text-align: center;
	}
</style>