---
title: aria2 download xcode
date: 2018-12-01 01:03:09
tags: [aria2, xcode]
---

<https://developer.apple.com/download/more/>

<!--more-->

```sh
sudo apt-get install aria2 -y

brew install aria2

aria2c -x16 --header="Cookie: your cookie" "https://download.developer.apple.com/Developer_Tools/Xcode_10.1/Xcode_10.1.xip"
```