# Week In Review #1
*24 Nov 2017*

Welcome to the first edition of *Week In Review* for the Nimiq blockchain project. This is a fan-created project and has no official connection to the Nimiq developer team or the Nimiq Foundation.

With these *Week In Review* articles I hope to bring regular updates of what is happening in the Nimiq blockchain project to the community. This includes a summary of general news and updates from the team, updates on what is being worked on in the Github repository and information about community projects that are worth pointing out.

Since this is the first of (hopefully) many *Week In Review* editions, and because there has been a lot of activity in the Github repository in the lead up the the Luna testnet launch, this first edition will cover a bit more than just the last week of updates.

## Nimiq News
* The next version of the testnet, *Luna*, is set to be released before the end of November
* The launch date for the mainnet has been quietly pushed back to "Q1 2018", from the previous target date of "December 2017"
* The developer team is currently living and working in Germany, in the lovely town of Saarbrücken
    * At least a part of the team is planned to move back to Costa Rica in December
* The Nimiq Foundation has been officially signed into existence, based in Zug, Switzerland

## Code Updates
Marvin, Pascal and Philipp have been very active these last weeks preparing the code for the Luna testnet release. Important changes were among others:
* Enabling the nano and light clients
    * Proof of proof of work implementation
    * Incremental chain updates (blockchain interlink)
* New difficulty algorithm based on the block time of the last 120 blocks (~2 hours)
    * This should lead to smoother difficulty changes
* Updating how clients communicate with each other
    * Making information transfer in the network more efficient
* Implementation of the new hashing algorithm ARGON2 (using BLAKE2B and ED25519 internally)
    * Algorithm written in the C programming language and compiled to WASM, which should give near-native performance in browsers that support WASM.
    * Slower JavaScript fallback for older browsers is available
* Use Pascal's JungleDB for all internal database interactions, removing code duplication
* Implement network-adjusted time for all clients to reduce the impact of wrong system clocks
* Implement multi-threading for both browser and nodejs clients
    * Allows mining with more than one thread in parallel, utilizing multi-core CPUs without the hassle of starting multiple browser windows
    * Allows throttling of the mining process to not use a full CPU core
    * Allows changing the number of threads during runtime
* Add `extraData` field to blocks, enabling the inclusion of custom data into a block by miners (can be used for example for mining pool information)
* Enable automatic reconnect in case the connection to the network is lost
* Make addresses more user-friendly, like this: `NQ58 V5SC X572 D419 XFG2 G60M XJGR C937 7TK3`
    * The first two letters `NQ` are the same for all addresses and signal that this is a Nimiq address
* The team experimented with different target block times throughout the last month, from 5 seconds to 30 seconds. The block time is currently back to 60 seconds per block.
* Various changes to the information displayed in the *Nimiq Cockpit* browser clients from the github repository
* Allow multiple concurrent transactions per sender (full and light clients only)
* Miner automatically prefers transactions with higher fees
* Many more general fixes and improvements

## Community Projects
Only one project has received updates over the last month, and that is the [Nimiq price website](https://nimiqprice.com). All other community developers are anxiously waiting for the Luna release to adapt their projects to the new testnet. You can look forward to new versions of the Faucet, the Nimiq blockchain explorers and the Nimiq browser extensions.

---

That's all for today. See you in a week!
