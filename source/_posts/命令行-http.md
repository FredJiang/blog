---
title: 命令行 http
date: 2018-06-25 22:59:27
tags: [curl, shell, http, httpie]
---

<https://httpie.org/>

<!--more-->

```
curl \
--trace-ascii /dev/stdout \
-H "Content-Type: application/json" \
-d '
{
  "name": "fred",
  "age": 18
}
' \
"http://127.0.0.1:8080/xxx"


curl \
-v \
-H "Content-Type: application/json" \
-d '
{
  "name": "fred",
  "age": 18
}
' \
"http://127.0.0.1:8080/xxx"


curl \
--trace-ascii /dev/stdout \
-H "Content-Type: application/x-www-form-urlencoded" \
-d 'name=fred&age=18' \
"http://127.0.0.1:8080/xxx"


curl \
-v \
-H "Content-Type: application/x-www-form-urlencoded" \
-d 'name=fred&age=18' \
"http://127.0.0.1:8080/xxx"
```


```
http -v        POST http://127.0.0.1:8080/xxx name='fred' age=18

http -v --form POST http://127.0.0.1:8080/xxx name='fred' age=18
```