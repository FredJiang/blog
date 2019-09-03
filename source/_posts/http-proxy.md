---
title: http proxy
date: 2019-05-30 14:57:59
tags: [http, https, proxy, mitmproxy, wireshark]
---

<https://blog.51cto.com/z00w00/1031287>

<!--more-->

```sh
mitmweb

curl -v -k "http://127.0.0.1:3000" -d "name=fred"
curl -v -k "http://127.0.0.1:3000" -d "name=fred" --proxy "http://127.0.0.1:8080"

curl -v -k "https://127.0.0.1:3000" -d "name=fred"
curl -v -k "https://127.0.0.1:3000" -d "name=fred" --proxy "http://127.0.0.1:8080"
```
