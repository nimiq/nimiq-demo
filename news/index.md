---
title: "News"
permalink: /news/index.html
---

<ul>
{% for item in site.news %}
  <li><a href="{{ item.url }}">{{item.date}} | {{ item.title }}</a></li>
{% endfor %}
</ul>
