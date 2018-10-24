Before this, we need to setup EOS (docker or native) and eos CDT (contract development toolkit).

**eosio-cpp** comes with CDT toolchain. We will use this to compile our contracts to WASM



**About WASM** : Webassembly, performance in browsers

**Why EOSIO chose C++ :** best compatibility with WASM



1. **Create a contract : mycontract.cpp**
   - this contract will simpy create a transaction that says hello to a user

```c++
#include <eosiolib/eosio.hpp> // Loads EOSIO C/C++ APIs
#include <eosiolib/print.hpp> // API to print to console

using namespace eosio;        // Use namespace for eosio lib

class mycontract : public contract {
	public:
		using contract::contract;

		[[eosio::action]]
		void myaction(name user){
			print("My contract was used to say hi to : ", name{user});
		}
};

EOSIO_DISPATCH(mycontract, (myaction))   // EOSIO_ABI is renamed to EOSIO_DISPATCH now
```

2. **Compile**

```bash
eosio-cpp -o mycontract.wasm mycontract.cpp --abigen
```

3. **Create an account hello that will send the transaction**
   - make sure to unlock your wallet if not already done so
   - as each transaction has to be signed by the wallet
   - And creatign account is a trasaction on blockchain

```bash
cleos create account eosio mycontract EOS8NkSHJpKRqTzme4m1rMQRsZtkgSJnp4a2TKDb83kng4rcJSrEh -p eosio@active
```

**here** EOS5wHoN1c72q2ttocGrq59Eh8ESQbVMFDABciLKb3aktf3dLBPMj **is a public key we imported to the wallet**

3. **Set the contract on blockchain using the new account**

```bash
cleos set contract mycontract /Users/nishantsingh/Projects/eos/with-docker/contracts/mycontract -p mycontract@active
```

4. **Push an action to the contract**
   - in below command, we use bob to authorize the the transaction

```bash
cleos push action mycontract myaction '["bob"]' -p bob@active
```

output: 
```
executed transaction: 4c10c1426c16b1656e802f3302677594731b380b18a44851d38e8b5275072857  244 bytes  1000 cycles
#    hello.code <= hello.code::hi               {"user":"bob"}
>> Hello, bob
```



Now lets send the same trasaction from alice to bob : 

```bash
cleos push action mycontract myaction '["bob"]' -p alice@active
```

5. Only a use can say hi to himself

   - lets add auth to make sure the user being said hi to is the one that authorized the transaction
   - we can do this by adding **require_auth( user );**

   ```cpp
   #include <eosiolib/eosio.hpp>
   #include <eosiolib/print.hpp>
   
   using namespace eosio;
   
   class mycontract : public contract {
   	public:
   		using contract::contract;
   
   		[[eosio::action]]
   		void myaction(name user){
   		    require_auth( user );
   			print("My contract was used to say hi to : ", name{user});
   		}
   };
   
   EOSIO_DISPATCH(mycontract, (myaction))
   ```

   - now lets dispatch the transaction with alice's credentials 

   ```bash
   cleos push action mycontract myaction '["bob"]' -p alice@active
   ```

   Output: 

   ```
   Error 3090004: Missing required authority
   Ensure that you have the related authority inside your transaction!;
   If you are currently using 'cleos push action' command, try to add the relevant authority using -p option.
   ```




```bash


```



```

```





eosio-cpp -o hello.wasm hello.cpp --abigen && cleos set contract hello /Users/nishantsingh/Projects/eos/with-docker/contracts/hello -p hello@active && cleos push action hello hi '["bob"]' -p bob@active







