---
layout: default
date: 2017-12-17
title: "Week In Review #4"
description: "Welcome to the forth edition of Week In Review for the Nimiq blockchain project: Luna version 3, lots of new things!"
---

# Week In Review #4
*17 Dec 2017*

Welcome to the forth edition of *Week In Review* for the [Nimiq blockchain project](https://nimiq.com). There is lots to talk about today, so let's get started:

## Nimiq News
* The Luna testnet was updated to version 3, bringing many new features ([Blog post by Robin](https://medium.com/nimiq-network/luna-protocol-update-2-b19b33054360)).


## Code Updates
Lunas v3 was released with these headline additions:

* Advanced account types
    * The team implemented a new account base class, from which new account types can be inherited, for example vesting accounts and multi-signature accounts (also hashed time-locked accounts in the feature for off-chain payment channels).
    * Vesting accounts hold NIM that will be released to the team, or early adopters, over a period of time after the mainnet launch. These accounts automatically transfer NIM to pre-determined accounts at specific blocks.
    * Multi-signature accounts allow for transactions to be required to be approved by two or even more accounts to be valid.
* Interlink vector compression
	* Interlink vectors (the proof-of-proof-of-work that allows light clients to only require a few recent block headers to fully participate in the blockchain) where compressed to require less bytes, reducing the workload required to validate them and making space for more transactions in each block.
* Block reward emission curve
	* While the total planned supply of 21 million NIM has not changed, the way new coins are rewarded for mined blocks did: instead of a fixed reward amount for ~4 years followed by an instant halving, the block reward in Nimiq will be reduced by a small amount at every block. The details and a comparison to bitcoin's scheme are in the [blog post by Robin](https://medium.com/nimiq-network/luna-protocol-update-2-b19b33054360#cd72).
* Transaction proofs of inclusion or exclusion
	* A new subscription feature has been added to nano clients, that allows them to subscribe to connected light or full peers and listen for changes specific to their wallet address. Since nano clients do not download the balance of all accounts, this allows them to more efficiently update their known balance when blocks are mined.

Other notable changes in the github repo include:

* The miner received updates that makes it more resilient to transactions spamming by one or more network participants:
	* The miner now only restarts calculating a block every 10 seconds, if new transactions are received.
	* A bug was fixed that prevented the miner from including transaction from a sender, if that sender had more waiting transactions than would fit into the next block. The miner now properly splits waiting transactions by the same sender.
	* More mitigations against low-fee transaction spam are currently being developed by Pascal.
* Marvin started to implement HTLCs (hashed time-locked contracts), but they are not merged into the main code yet.
* A feature is now in development to allow locking of the private key in the browser. Since the private key is only required for signing transactions, but not for mining (only to start mining), it can be encrypted and locked so that other 3rd-party JavaScript cannot read it. 
* Reduced logging output (in the browser console and for the nodejs client) for multiple non-significant events.
* Jeff is working on behind-the-scenes network configuration improvements to make working with those configurations easier and more in line with the rest of the code base.
* The maximum amount of data stored in a block's `extraData` field is now limited to 255 bytes (255 ASCII characters).
* Automatically generated ESDoc code documentation is now available at <https://doc.esdoc.org/github.com/nimiq-network/core/>.
* The code test suite was updated with new tests, increasing the code test coverage and adding new test environments.

## Community Projects
* You can now see the past [global hashrate development over time](https://nimiq.watch/#chart-global-hashrate) and the recent [block mining distribution](https://nimiq.watch/#chart-hashing-distribution) on NIMIQ.WATCH

---

Thank you for reading! Until next week, for the latest update just before christmas.

[Last week's news roundup can be found here.](https://nimiq.watch/news/2017-12-08-week-in-review-3.html)

### *About this newsletter*

With these *Week In Review* articles I hope to bring regular updates of what is publicly happening in the Nimiq blockchain project to the community. This includes a summary of general news and updates from the team, updates on what is being worked on in the public [Github repository](https://github.com/nimiq-network/core) and information about community projects that are worth pointing out.

> This article is fan-created and has no official affiliation with the Nimiq developer team or the Nimiq Foundation. As such this article is not able to talk about inner workings of the team, code in private repositories or plans for the future.
