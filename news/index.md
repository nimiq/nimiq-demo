---
title: "News"
permalink: /news/index.html
---

# News

<ul>
{% for item in site.news %}
  <li><a href="{{ item.url }}">{{item.date | truncate: 10, ""}} | {{ item.title }}</a></li>
{% endfor %}
</ul>

# News

<ul>
{% for item in site.posts %}
  <li><a href="{{ item.url }}">{{item.date}} | {{ item.title }}</a></li>
{% endfor %}
</ul>

# News

<ul>
{% for item in site.pages %}
  <li><a href="{{ item.url }}">{{item.date}} | {{ item.title }}</a></li>
{% endfor %}
</ul>
