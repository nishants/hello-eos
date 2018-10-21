**What is EOS ?**

- decentralized **operating system**
- mosy cryptocurrency aims to be p2p payment system
- EOS wants to be OS for industrial scale decentralized applications
- Like internet on blockchain
- so anything that can be done with regular internet can also be done with EOS



**Ethereum**

- great smart contract abilities
- low transaction speed bottleneck for distributed apps
- gas price (transaction fee) is problematic, transaction fee change fluctuate with  network usage
- can respond to quick changes (like DAO attach) because of its consensus mechanism



**No trasaction fees**

On ethereum the transactoin fees rises when the network is under load. Ethereum wants to have no transaction fees whatsover.All other cryptocurrency projects have transaction fee as well.



**What is a transaction**

- an event that changes the state of blockchain
- like A transfered bitcoin to B 
- e.g. the event is recorded in one of the blocks in the chain as a transaction)
- now future decisions in the blockchain will be affected by this transaction (e.g. how much bitcoins A and B can withdraw)



**Parallel processing** 

**Transactions per second**

Unlike Ethereum , it is designed to be able to handle millions (claimed for futuer, though right now it can handle upto 5000 transactions per second) of transactions per second. Ehtereum allows about 15 transactions per second.



- 

**EOS token** 

- acts like currency (hold value)
- EOS token holder gets to vote.



**What is EOS constitution ?**

- is it like a constitution of new internet ?

Dan Larimer CTO of Block One

- creator of delegated-proof-of-stake (DPOS)
- creator of DAOs i.e. decentralized autonomous organizations
- also worked on BitShares and Steem



**Elected block producers** 

- like the DNS for info internet

**Why other blockchain have low TPS ?**

- bitcoin : 3-4 transactions per second
- ethereum : 20 transactions per seconds
- (Visa : 1667, Paypal: 193)
- Other blockchains are slow because of their consensus mechanism which needs the consensus of every node in the network (how slow decision making be if every govt act required a national polling ?)
- EOS claims it can support millions of transactions per second with DPOS.



**Self funding**

- 5% inflation rate
- i.e. 5% new tokens created each year
- 1% of the token goes to block producers to cover up their cost of electricity, storage, network 
- rest 4 % goes to top three proposoal (smart contracts) based on voting from token holders aimed at growth, development and maintainance
- resources are acuired by staking claim (tokens) rather than selling it, hence users does not pay for infra but the inflation does
- link : https://www.reddit.com/r/eos/comments/8zx018/please_help_me_understand_the_purpose_of/
- 



**Flexibility** 

- elected block producers can make decisions like freezing an app if it misbehaves
- supports parallel processing of smart contracts (support of horizontal scalability)
- supports aync communication
- makes smart contracts to be written in a way that describes what can be done in paralle
- interoperable : nodes can share information

- has web toolkit for interface development
- self describing interfaces
- self desccibing database schemas
- declarative permission scheme
- 



**Governance**

- Has a defined constitution for governance

- every transaction has a **hash of constitution** in signature 

- hence every user is bound to constitution


**The constitution and protocol can be amended by the following process:**

- The change is proposed by the block producer who obtains a 17/21 approval rate
- The 17/21 approval must be maintained for 30 straight days.
- All users are required to sign off their transaction using the hash of the new constitution.
- Block producers adopt changes to the source code to reflect the change in the constitution and propose it to the blockchain using the hash of a git commit.
- Block producers again need to maintain 17/21 approval for 30 consecutive days.
- After that, full nodes are given one whole week to adapt to the new changes.
- Any node that doesn’t follow the new protocol is automatically shut down.



**useful links :** 

- https://blockgeeks.com/guides/eos-blockchain/
- https://www.eos-radar.com/
- https://dappradar.com/eos-dapps

H

- https://www.reddit.com/r/eos/comments/8zx018/please_help_me_understand_the_purpose_of/



**Creating account**

- account name in EOS (like steemit) is mapped to a human-readable name
- that means we need to store this info in blockchain
- hence an on-chain transaction is needed to create this information
- but a transaction requires user to stake tokens (DPOS model)
- hence its not free



**Resource allocation**

- CPU, Bandwidth, local storage : staked
- **RAM** : *purchased at market price*



Philosophy : 

- internet we knew so far was a network of information
- server's had information, consumers used them
- server were owned by single authority
- new internet has distributed authority



EOS brings end to the chaos by proposing provision of

- elected government for making decisions, instead of holding a nation wide election process to create consensus for every group act
- this alows EOS to 
  - make much higher number of decision every second (TPS)
  - react to emergencies quickly ( like DAO attack on Ethereum network)
- Just like constitutional amendments require a very stable, government in India for a long time (to gain seats in upper parliamentary house as well), similarity there are well defined norms for making a chaing in EOS constitution, which needs more than majority (17/21) consesus of block producers (delegated decision makers)  and stablity of 30 days before and after the change, signoff from every node in the network



- but value as well