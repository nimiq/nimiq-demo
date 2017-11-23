---
layout: default
date: 2017-11-24
title: "Week In Review #1"
description: "Welcome to the first edition of Week In Review for the Nimiq blockchain project."
---

# Week In Review #1
*24 Nov 2017*

Welcome to the first edition of *Week In Review* for the [Nimiq blockchain project](https://nimiq.com).

> This article is fan-created and has no official affiliation with the Nimiq developer team or the Nimiq Foundation. As such this article is not able to talk about inner workings of the team, code in private repositories or plans for the future.

With these *Week In Review* articles I hope to bring regular updates of what is publicly happening in the Nimiq blockchain project to the community. This includes a summary of general news and updates from the team, updates on what is being worked on in the public [Github repository](https://github.com/nimiq-network/core) and information about community projects that are worth pointing out.

Since this is the first of (hopefully) many *Week In Review* editions, and because there has been a lot of activity in the Github repository in the lead up to the Luna testnet launch, this first edition will cover a bit more than just the last week of updates.

## Nimiq News
* The next version of the testnet, [Luna](https://medium.com/nimiq-network/introducing-luna-fa0a845fd33e), is set to be released before the end of November
* The launch date for the mainnet has been quietly pushed back to "Q1 2018", from the previous target date of "December 2017"
    * Richy explained that the delay is not caused by technical problems, but rather to have enough time for the conversion of NET to NIM after the Christmas and New Year's holidays.
* The developer team is currently living and working in Germany, in the lovely town of Saarbrücken (<https://youtu.be/DD2cIUTKBEY?t=4m15s>)
    * At least a part of the team is planned to move back to Costa Rica in December
* The Nimiq Foundation has been officially signed into existence, based in Zug, Switzerland, also known as *Crypto Valley* (<https://youtu.be/CcO4DewZBDQ?t=4m29s>)

## Code Updates
Marvin, Pascal and Philipp have been very active these last weeks preparing the code for the Luna testnet release. Important changes were among others:
* Enable nano and light clients
    * Efficient mini-blockchain scheme (<https://cryptonite.info/files/mbc-scheme-rev3.pdf>)
    * Incremental chain updates and blockchain interlink, powered by a *Non-Interactive Proof-of-Proof-of-Work* implementation (<http://fc16.ifca.ai/bitcoin/papers/KLS16.pdf> and <https://eprint.iacr.org/2017/963.pdf>)
* New difficulty algorithm based on the block time of the last 120 blocks (~2 hours)
    * This should lead to smoother difficulty changes
* Updating how clients communicate with each other
    * Making information transfer in the network more efficient
* Implementation of the new algorithms
    * BLAKE2B is the regular hashing algorithm
    * ARGON2 is used as the Proof-of-Work hashing algorithm, as it does not run much faster on GPUs than on CPUs
    * ED25519 is a fast public-key system that is used for signing transactions and blocks (and for multi-signature wallets in the future)
    * All three algorithms are written in the C programming language and are compiled to WebAssembly (WASM), which should give near-native performance in browsers that support it.
    * Slower JavaScript fallbacks for older browsers are available
* Using Pascal's JungleDB for all internal database interactions, removing code duplication
* Implementing network-adjusted time for all clients to reduce the impact of wrong system clocks
* Implementing multi-threading for both browser and nodeJS clients
    * Allows mining with more than one thread in parallel, utilizing multi-core CPUs without the hassle of starting multiple browser windows
    * Allows throttling of the mining process to not use a full CPU core
    * Allows changing the number of threads during runtime
* Adding `extraData` field to blocks, enabling the inclusion of custom data into a block by miners (can be used for example for mining pool information)
* Enabling automatic reconnect in case the connection to the network is lost
* Making addresses more user-friendly, like this: `NQ58 V5SC X572 D419 XFG2 G60M XJGR C937 7TK3`
    * The first two letters `NQ` are the same for all addresses and signal that this is a Nimiq address
* The team experimented with different target block times throughout the last month, from 5 seconds to 30 seconds. The block time is currently back to 60 seconds per block.
* Various changes to the information displayed in the *Nimiq Cockpit* browser clients from the Github repository
* Allowing multiple concurrent transactions per sender (full and light clients only)
* Miners automatically prefer transactions with higher fees
* Many more general fixes and improvements

## Community Projects
Only one project has received updates over the last month, and that is the [Nimiq price website](https://nimiqprice.com). All other community developers are anxiously waiting for the Luna release to adapt their projects to the new testnet. You can look forward to new versions of the Faucet, the Nimiq blockchain explorers and the Nimiq browser extensions.

---

That's all for now. See you next Friday!
