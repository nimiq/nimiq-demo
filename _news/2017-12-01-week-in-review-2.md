---
layout: default
date: 2017-12-01
title: "Week In Review #2"
description: "Welcome to the second edition of Week In Review for the Nimiq blockchain project."
---

# Week In Review #2
*01 Dec 2017*

Welcome to the second edition of *Week In Review* for the [Nimiq blockchain project](https://nimiq.com).

> This article is fan-created and has no official affiliation with the Nimiq developer team or the Nimiq Foundation. As such this article is not able to talk about inner workings of the team, code in private repositories or plans for the future.

With these *Week In Review* articles I hope to bring regular updates of what is publicly happening in the Nimiq blockchain project to the community. This includes a summary of general news and updates from the team, updates on what is being worked on in the public [Github repository](https://github.com/nimiq-network/core) and information about community projects that are worth pointing out.

## Nimiq News
* The whole team arrived back in Costa Rica this week, to again focus on development. The first fixes and improvements for Luna are starting to appear in the GitHub repository.
* Robin showed off a protoype for the Nimiq Wallet App for smartphones in a video posted to the Youtube channel yesterday (<https://youtu.be/9wnk8t9TAcw>). I uploaded some screengrabs of the prototype from the video here: <https://imgur.com/a/zJkQP>.
* Robin attended the Baltic Honeybadger 2017 Bitcoin Conference in Riga (<https://imgur.com/GCPsR3o>).
* Timo (@R3dexe on Telegram) wrote a nice explanation of why graphic cards do not have a significant advantage with Nimiq's Proof-of-Work algorithm:
> "I think RAM usage isn't the limiting factor [with the current algorithm]. The problem with RAM latency based mining algos is that a GPU is esentially 1000 cores which can access 10 GB of RAM. So they can send 1000 requests while a normal CPU can only send 8 or 16 at a time. That's why [the team] dropped the cuckoo cycle algo; they were forced to increase the RAM usage to several GB (I think it was 4) to keep GPUs from outperforming the CPUs, so devices like phones with only 2GB of accessible RAM wouldn't be able to mine. On top of that, the VRAM of graphics cards is expected to increase in the next few years due to higher resolution textures, so they would need to constantly adjust the mining algo. Plus, it wouldn't be impossible to just strap additional VRAM on existing cards to mine again.
> So they changed the algo to Argon2d which relies on cache latency. GPUs do have a cache, but it's relatively small. A GTX1080 has 2048kb L2 and no L3, while a i7 7700k CPU has 8mb of L3 cache. GPUs generally don't need that much cache because the work they are designed for is highly parallel (3D rendering), while CPUs are designed to work on a linear task. So the goal was to make it hard to make mining parallel"

## Code Updates
Some users reported some issues with the miner in the new testnet, so the developers recently started fixing those bugs. Otherwise, it has been a slow week on the code side, since this week was used for the team to move back to Costa Rica. (It has a nice 25-26°C there.)

* Marvin is working on adding an `extraData` field to blocks, to store information about future mining pools
* The docker container script got fixed, so you should be able again to run the nodejs client from docker
* Lots of work regarding the sorting, including and calculating transactions during mining, which should fix the *invalid block* errors
    * These changes are not yet in the release build, but should be available soon

## Community Projects
* <https://nimiq.watch> got updated to be able to search for blocks and accounts again with Luna. A further update, including searching for blocks by height and viewing account history are planned to be added soon.
* <https://nimiq.mopsus.com> is a new block explorer with interesting features such as a list of top miners. Account history is also available.

---

That's all for today. Until next week!

[Last week's news roundup can be found here.](https://nimiq.watch/news/2017-11-24-week-in-review-1.html)
