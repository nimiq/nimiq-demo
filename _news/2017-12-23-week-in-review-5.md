---
layout: default
date: 2017-12-23
title: "Week In Review #5"
description: "Welcome to the fifth edition of Week In Review for the Nimiq blockchain project: Luna testnet updates and christmas holidays."
---

# Week In Review #5
*23 Dec 2017*

Welcome to the fifth edition of *Week In Review* for the [Nimiq blockchain project](https://nimiq.com).

## Nimiq News
* A short video was posted to the Nimiq Youtube channel discussing the first update to the Luna testnet (4th Dec 2017) and Philipp's role in the team: <https://www.youtube.com/watch?v=-YAj_nWGvm4>
* Richy posted an interesting comment in Telegram:
    > I verified about LN and we are actually trying to be swift and quick with the deployment of the mainnet. So right now we are moving into a core network hardening phase and then launch of the Mainnet. We are currently working in Off-chain transaction but they won't delay the deployment of the core Mainnet.

    Richy clarified that his comment does not make a statement about the release schedule, but rather means that the payment channels (Lighting Network) may not be included in the first mainnet release, but added later.

* The team is taking their well-deserved christmas holiday with their families and will arrive back in Costa Rica towards the end of the third week of January.

## Code Updates
* Low-fee transaction spam protection features are now released. Only 10 transactions from the same sender with a fee *lower than 1 satoshi/byte* are now accepted by the network. Low-fee transactions are also forwarded slower between peers.
* Pascal improved the security of multi-signature wallets to prevent related-key attacks.
* More tests where added to improve code test-converage (currently 56.38%).

## Community Projects
Richy launched the [nimiq.community](http://nimiq.community/blog/welcome-to-nimiq-community/) website with contributing guidelines, a benchmark section and the new [NodeJS miner tutorial](http://nimiq.community/blog/setting-up-nodejs_miner/).

---

That is all for today! Like the team, I will also take my christmas holiday and will not publish *Week In Review* next week. I will be back in January, as soon as there is something to report on. Stay tuned, and have a lovely holiday!

[Last week's news roundup can be found here.](https://nimiq.watch/news/2017-12-17-week-in-review-4.html)

### *About this newsletter*

With these *Week In Review* articles I hope to bring regular updates of what is publicly happening in the Nimiq blockchain project to the community. This includes a summary of general news and updates from the team, updates on what is being worked on in the public [Github repository](https://github.com/nimiq-network/core) and information about community projects that are worth pointing out.

> This article is fan-created and has no official affiliation with the Nimiq developer team or the Nimiq Foundation. As such this article is not able to talk about inner workings of the team, code in private repositories or plans for the future.
