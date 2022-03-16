<script lang="ts">

 import { selected_account,password_store,walletStore } from "../stores";

let internalState: String = "main";

let addressDestination = "";
let amount = "";
let successMsg = ""


async function sendTransaction(){
    internalState = "loading";
    let return_data_transaction = await globalThis.api.sendTransaction($selected_account,$password_store,addressDestination,amount);
    if(return_data_transaction.result){
            let resultTransactionId = return_data_transaction.msg.payload.id;
            alert("Transaction ID: "+resultTransactionId);
            successMsg = "https://explorer.iota.org/devnet/message/" + resultTransactionId;
            internalState = "successInfo";  
    }   
    
    else{
    alert(return_data_transaction.msg); 
    internalState = "main"; 
    }
    
}
       

</script>

 <h1> Transactions</h1>
{#if internalState == "main"}
<h3>
    Address Destination: <input type="text" bind:value={addressDestination}>
    <br/>
    Amount to send: <input type="number" bind:value={amount}>
    <br/>
    <button on:click={sendTransaction}>Send</button>
</h3>
<br/>
<button on:click={() => walletStore.previous()}>Back</button>
{:else if internalState == "loading"}
     <h2>Waiting...</h2>
{:else if internalState == "successInfo"}
        <h3>
            Transaction sent to Tangle successfully!
        <br>
         <a href={successMsg} target="_blank">Transaction on Explorer.iota.org</a> 
         </h3>
     <button on:click={() => walletStore.previous()}>Back</button>
{/if}


<style>
	h1,h3{
		text-align: center;
	}
    .button {
		text-align: center;
	}
</style>