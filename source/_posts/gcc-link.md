---
title: gcc link
date: 2019-05-28 16:40:43
tags: [gcc, compile, link]
---

* <https://www.thegeekstuff.com/2011/10/c-program-to-an-executable/>
* <https://www.thegeekstuff.com/2011/10/gcc-linking/>

<!--more-->

```sh
ldd main

readelf --relocs      reloc.o

objdump --disassemble reloc.o
```