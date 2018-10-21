

## 1. Setup Eos with Docker

https://developers.eos.io/eosio-home/docs/getting-the-software

1. Get docker image 

```
 docker pull eosio/eos:v1.3.2
```

2. Boot node and wallet in docker contaier

   ```
   docker run --name eosio \
     --publish 7777:7777 \
     --publish 127.0.0.1:5555:5555 \
     --volume /Users/nishantsingh/Projects/eos/with-docker/contracts:/Users/nishantsingh/Projects/eos/with-docker/contracts \
     --detach \
     eosio/eos \
     /bin/bash -c \
     "keosd --http-server-address=0.0.0.0:5555 & exec nodeos -e -p eosio --plugin eosio::producer_plugin --plugin eosio::history_plugin --plugin eosio::chain_api_plugin --plugin eosio::history_plugin --plugin eosio::history_api_plugin --plugin eosio::http_plugin -d /mnt/dev/data --config-dir /mnt/dev/config --http-server-address=0.0.0.0:7777 --access-control-allow-origin=* --contracts-console --http-validate-host=false --filter-on='*'"
   ```

   3. Check node installtion 

      ```
      docker logs --tail 10 eosio
      ```



4. Check wallet

```bash
docker exec -it eosio bash # enter into eos container bash shell
cleos --wallet-url http://127.0.0.1:5555 wallet list keys # use cleos to conect with keosd and check wallets (right now their is no wallet)

```



5. Check nodeos endpoints

-  `get_info` endpoint provided by the `chain_api_plugin`

  ```
  curl http://localhost:7777/v1/chain/get_info # 
  ```



6. Create alias for cleos command (runs command directly inside the container)

7. ```bash
   alias cleos='docker exec -it eosio /opt/eosio/bin/cleos --url http://127.0.0.1:7777 --wallet-url http://127.0.0.1:5555'
   ```



7. Start and stop eos container 

```bash
docker start eosio
docker stop eosio
docker exec -it eosio bash # eos bash

```




## 2. Setup CDT (Contract Development Toolkit)

- skipped the doc here : https://developers.eos.io/eosio-home/docs/installing-the-contract-development-toolkit
- Used brew to install binary : 

```bash
brew tap eosio/eosio.cdt
brew install eosio.cdt
```



## Component of EOS 

- `nodeos` (node + eos = nodeos) - the core EOSIO **node** daemon that can be configured with plugins to run a node. Example uses are block production, dedicated API endpoints, and local development.
- `cleos` (cli + eos = cleos) 
  - CLI to interact with
  - to wallet
  - to nodeos
- `keosd` (key + eos = keosd) 
  - stores keys (public/private)\
- `eosio-cpp` - 
  - Part of `eosio.cdt`, 
  - compiles C++ code to `WASM` 
  - and can generate ABIs



# Create development wallet

Wallets are used for auth, not for storing the tokens

- Create wallet 

- ```bash
  cleos wallet create --to-console
  ```

- open wallet 

```
cleos wallet open
```

- List wallets

```bash
cleos wallet list
```

- I forgot the save the default wallet key, so craeted another one

```bash
cleos wallet create wallet-1 --to-console
```

Without password imported keys will not be retrievable.
"**PW5K2ME465dar42itSPPLGPfgeAKjpUs1EmAkHJr4byLnUmM6GDUC**"

​	PW5K2ME465dar42itSPPLGPfgeAKjpUs1EmAkHJr4byLnUmM6GDUC

PW5K2ME465dar42itSPPLGPfgeAKjpUs1EmAkHJr4byLnUmM6GDUC

- Import key into wallet

```bash
cleos wallet create_key -n wallet-1
```

Created new private key with a public key of: : **EOS5wHoN1c72q2ttocGrq59Eh8ESQbVMFDABciLKb3aktf3dLBPMj** 

- **Import development key**

  - Every new EOSIO chain has a default **system** user called **eosio**
  - This account is used to setup chain
  - Every new EOSIO chaing comes with the same development key
  - Now we will load this key to sign transaction on behalf of system user (eosio)

  ``` bash
  cleos wallet import -n wallet-1
  ```

  - Enter the private key as **5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3** (same for all new EOSIO chains)
  - This key should not be used in production though





## Create test accounts

- Account is a 
  - collection of authorizations
  - stored on the blockchain
  - Used to identify sender/recepient
  - can be owned by individual or a group of individuals
  - an accoutn is required to sent or receive a transaction to the blockchain

- Create accounts for **Bob** and **Alice **(using the public key we imported to wallet)

  ```bash
  cleos create account eosio bob EOS5wHoN1c72q2ttocGrq59Eh8ESQbVMFDABciLKb3aktf3dLBPMj 
  cleos create account eosio alice EOS5wHoN1c72q2ttocGrq59Eh8ESQbVMFDABciLKb3aktf3dLBPMj
  ```

  This should output : 

  ```
  executed transaction: 09e4585ce69fcb6b9678e4e0aec478e08cb9600d403f61cb0f966e61a507a5fd  200 bytes  414 us
  #         eosio <= eosio::newaccount            {"creator":"eosio","name":"alice","owner":{"threshold":1,"keys":[{"key":"EOS5wHoN1c72q2ttocGrq59Eh8E...
  warning: transaction executed locally, but may not be confirmed by the network yet    ]
  ```



- Use a owner/active key combination
  - so if account is compromised, we can use the owner key to regain account access











- What are wallets 

  - Stores keys not tokens
  - Transaction object is sent to wallet
  - Wallet signs the transaction object 
  - When networks confirms the signature on transaction is correct
  - only then trasaction is included in a block


## Setting up nodeos

1. 

2. 

3. Setup EOS node using docker (https://developers.eos.io/eosio-nodeos/docs/docker-quickstart)

   1. pull docker image

   ```
   docker pull eosio/eos-dev:v1.3.0
   ```



   2. Create network

   ```
   docker network create eosdev
   ```



   3. Boot containers

   ```
   docker run \
     --name nodeos -d -p 8888:8888 \
     --network eosdev \
     -v /tmp/eosio/work:/work \
     -v /tmp/eosio/data:/mnt/dev/data \
     -v /tmp/eosio/config:/mnt/dev/config \
     eosio/eos-dev 
   /bin/bash -c \
     "nodeos -e -p eosio \
       --plugin eosio::producer_plugin \
       --plugin eosio::history_plugin \
       --plugin eosio::chain_api_plugin \
       --plugin eosio::history_api_plugin \
       --plugin eosio::http_plugin \
       -d /mnt/dev/data \
       --config-dir /mnt/dev/config \
       --http-server-address=0.0.0.0:8888 \
       --access-control-allow-origin=* \
       --contracts-console \
       --http-validate-host=false"
   ```

   1. run docker 