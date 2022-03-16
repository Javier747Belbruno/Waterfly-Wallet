<script lang="ts">

 import { selected_account,password_store } from "../stores";

let internalState: String = "main";

let balance = "";

async function getBalanceFromTangle(){
    internalState = "loading";
    let return_data_balance = await globalThis.api.getBalance($selected_account,$password_store);
        
    if(return_data_balance.result){
        
        balance = JSON.stringify(return_data_balance.msg.payload.total);
    }
    else{
        alert(return_data_balance.msg);
    }
    internalState = "main";   
}
        
</script>

{#if internalState == "main"}
    <h2>Balance: {balance} iotas</h2>
    <button on:click={getBalanceFromTangle}>Check Balance</button>
{:else if internalState == "loading"}
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