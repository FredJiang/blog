---
title: tr sed 比较
date: 2017-02-24 19:56:26
tags: [linux, tr, sed, shell]
---


* `tr` 字符替换
* `sed` 字符串替换


<!--more-->


`echo This+is+test+for+tr+and+sed | tr '+' ' '`

输出

`This is test for tr and sed`

---

`echo This+is+test+for+tr+and+sed | sed 's/\+/ /g'`

输出

`This is test for tr and sed`

---

* `echo I am a good boy | tr 'good' 'test'`

输出


`I am a tsst bsy`

替换规则

替换前的字符  |  替换后的字符 | 
------------- |---------------| -------------|
 g | t 
 o | e 
 o | s | 覆盖上一个规则
 d | t      


good > tsst

boy > bsy

---

test.txt

```
{}{}{}{}
{2}{2
}3}}
```

`tr '{}' '()' < test.txt > newtest.txt`

newtest.txt

```
()()()()
(2)(2
)3))
```