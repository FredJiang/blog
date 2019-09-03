---
title: mitmproxy 抓包
date: 2019-05-30 11:11:55
tags: [tcpdump, wireshark, mitmproxy, fiddler, charles, proxy]
---

* <https://mitmproxy.org/>

<!--more-->

m---i--t---m----- proxy
man-in-the-middle proxy

```sh
brew install mitmproxy

mitmweb
# 或
mitmproxy

curl -k -v --proxy "http://127.0.0.1:8080" "https://127.0.0.1:3000" -d "name=fred"
```

https

* <https://docs.mitmproxy.org/stable/concepts-certificates/>

`http://mitm.it`
