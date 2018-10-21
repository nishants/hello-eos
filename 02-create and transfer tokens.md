





In our local network, we will 

- create a new token type (SYS) 
-  issue a 100 tokens to alice
- transfer 25 token's from alice's account to bob
- check balance in alice account 
- check balance in bobs account



1. **Create token**

   - **Get the token contracts that will be used to create new token**

   ```
   git clone https://github.com/EOSIO/eosio.contracts --branch v1.4.0  --single-branch
   ```

   - **go to the token contract dir**

   ```
   cd eosio.contracts/eosio.token
   ```

   - **Create an account (eosio.token) for the contract**

   ``` 
   cleos create account eosio eosio.token EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
   ```

   - Compile the contract

   ```bash
   eosio-cpp -I include -o eosio.token.wasm src/eosio.token.cpp --abigen
    mkdir abi                   # Fix for missing abi file
    mv eosio.token.abi ./abi    # Fix for missing abi file
   ```



   - Deploy the token contract

   ```bash
   cleos set contract eosio.token /Users/nishantsingh/Projects/eos/with-docker/contracts/eosio.contracts/eosio.token --abi abi/eosio.token.abi -p eosio.token@active
   
   ```



   - Create token by dispatching action **token.contract** in token contract

   ```bash
   cleos push action eosio.token create '{"issuer":"eosio", "maximum_supply":"1000000000.0000 SYS"}' -p eosio.token@active
   ```



   - Above command create a **new token** "SYS"
   - **Precision** for token is 4 decimal points
   - **maximum supply** is 1000000000.0000 tokens
   - note that issuer is used as **eosio** user
   - The **eosio.token** is the account that has created this token,

   - hence only this account can **issue/freeze or recall tokens.**

   ​	



   **2 . Issue 100 tokens to Alice**

   ```bash
   cleos push action eosio.token issue '[ "alice", "100.0000 SYS", "memo" ]' -p eosio@active
   ```

   Output: 

   ```js
   executed transaction: 822a607a9196112831ecc2dc14ffb1722634f1749f3ac18b73ffacd41160b019  268 bytes  1000 cycles
   #   eosio.token <= eosio.token::issue    {"to":"user","quantity":"100.0000 SYS","memo":"memo"}
   >> issue
   #   eosio.token <= eosio.token::transfer {"from":"eosio","to":"user","quantity":"100.0000 SYS","memo":"memo"}
   >> transfer
   #    eosio <= eosio.token::transfer {"from":"eosio","to":"user","quantity":"100.0000 SYS","memo":"memo"}
   #    user <= eosio.token::transfer  {"from":"eosio","to":"user","quantity":"100.0000 SYS","memo":"memo"}
   
   ```

   - The output contains **three different action handers** while we dispatched just one
   - **[IMP]**These actions are **inline**(https://developers.eos.io/eosio-home/docs/inline-actions)
   - One action to issue, **two other to publish update** to  eosio account and Alice's account

   - This is so because

     a.  ***all account balances be derivable by the sum of the transfer actions that reference them***

     b. sender and receiver of funds be notified so they can **automate handling deposits** and **withdrawals**.

   - **[IMP]** To **inspect the transaction**, try using the `-d -j` options, they indicate **"don't broadcast"** and **"return transaction as json,"** which you may find useful during development.

   ```bash
   cleos push action eosio.token issue '["alice", "100.0000 SYS", "memo"]' -p eosio@active -d -j
   ```





3. **Transfer 25 SYS tokens from Alice to Bob**

```bash
cleos push action eosio.token transfer '[ "alice", "bob", "25.0000 SYS", "m" ]' -p alice@active
```



4. **Check final account balances**

```bash
cleos get currency balance eosio.token bob SYS
# 25.00 SYS

cleos get currency balance eosio.token alice SYS
# 75.00 SYS
```



```bash
git clone https://github.com/EOSIO/eosio.contracts --branch v1.4.0  --single-branch

cleos create account eosio eosio.token EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV

eosio-cpp -I include -o eosio.token.wasm src/eosio.token.cpp --abigen

 mkdir abi
 
 mv eosio.token.abi ./abi
 
cleos set contract eosio.token /Users/nishantsingh/Projects/eos/with-docker/contracts/eosio.contracts/eosio.token --abi abi/eosio.token.abi -p eosio.token@active

cleos push action eosio.token create '{"issuer":"eosio", "maximum_supply":"1000000000.0000 SYS"}' -p eosio.token@active

cleos push action eosio.token issue '[ "alice", "100.0000 SYS", "memo" ]' -p eosio@active


cleos push action eosio.token transfer '[ "alice", "bob", "25.0000 SYS", "m" ]' -p alice@active

cleos get currency balance eosio.token bob SYS


```



