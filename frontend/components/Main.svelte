<script lang="ts">

    import { walletStore,accounts_store,selected_account } from "../stores";

    let balance = "";
    let password = "";
    let state = "";

    function validatePassword(){

    }

    async function getBalanceFromTangle(){
        state = "loading";
	 	/*return_data_account = await globalThis.api.getBalance($selected_account,password);
        state = "response";
        if(return_data_account.id){
            data =  return_data_account.id;
        }else{
            data =  JSON.stringify(return_data_account);
        }*/
        
    }

</script>

    <h1> Main </h1>
     <br/>
     Type Password: <input type="text"  bind:value={password} />
     <button on:click={validatePassword}> </button>
    <h2>Balance</h2>


<style>
	h1,h2,h3{
		text-align: center;
	}
    .button {
		text-align: center;
	}
</style>