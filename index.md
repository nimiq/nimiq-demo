---
layout: default
title: "News"
permalink: /news/index.html
description: "Community-created weekly updates about the Nimiq blockchain project."
---

# News

Community-created weekly updates about the Nimiq blockchain project:

<ul style="list-style: none; padding: 0; line-height: 2">
{% for item in site.news reversed %}
  <li><a href="{{ item.url }}">{{item.date | truncate: 10, ""}} | {{ item.title }}</a></li>
{% endfor %}
</ul>
