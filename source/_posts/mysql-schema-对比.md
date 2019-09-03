---
title: mysql schema 对比
date: 2019-06-13 21:44:27
tags: [mysql, schema]
---

* <https://github.com/schemalex/schemalex>
* <https://github.com/schemalex/schemalex/releases>

<!--more-->

```shell
cd /opt/
aria2c16 'https://github.com/schemalex/schemalex/releases/download/v0.0.10/schemalex_darwin_amd64.zip'

/opt/schemalex_darwin_amd64/schemalex old.sql new.sql | ccat
/opt/schemalex_darwin_amd64/schemalex old.sql new.sql | pygmentize -l mysql
/opt/schemalex_darwin_amd64/schemalex old.sql new.sql | source-highlight -s sql -f esc
```
