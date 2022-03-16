<script lang="ts">

let internalState: String = "main";
import { selected_account,password_store } from "../stores";
let newAddress = "";
let listAddresses = "";

async function getNewAddressFromTangle(){
    internalState = "loading";
    let return_data_new_address = await globalThis.api.getNewOneAddress($selected_account,$password_store);
    if(return_data_new_address.result){
        newAddress = return_data_new_address.msg.address;
    }
    else{
        alert(return_data_new_address.msg);
    }
     internalState = "main";
}

async function getAddressListFromTangle(){
    internalState = "loading";
    let return_data_new_address = await globalThis.api.getAddressListFromTangle($selected_account,$password_store);
    if(return_data_new_address.result){
        listAddresses = return_data_new_address.msg;
    }
    else{
        alert(return_data_new_address.msg);
    }
    internalState = "main";
}

</script>

{#if internalState == "main"}
    <h2> Addresses</h2>
    <button on:click={getAddressListFromTangle}>get Address' List</button>
    <button on:click={getNewAddressFromTangle}>get new Address</button>
    <h2>Address' List: </h2>
        {#each listAddresses as a,i}
            <h4>#{i} : {a}</h4>
        {/each} 
    <h2>New Address: {newAddress}</h2>
    <br/>
    <a href="https://faucet.chrysalis-devnet.iota.cafe/" target="_blank">Copy an address and fill it with the Faucet</a>
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