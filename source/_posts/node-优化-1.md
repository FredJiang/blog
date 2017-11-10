---
title: node 优化 1
date: 2017-10-26 22:39:56
tags: [node.js, optimize, wrk, perf]
---

参考

《Node Cookbook 3rd Edition》

<!--more-->

优化流程

{% asset_img "QQ20171031-173303.png" "" %}

安装 Benchmark 工具

<https://github.com/mcollina/autocannon>

`npm install -g autocannon`

autocannon 使用

`autocannon -c 100 http://192.168.200.8:3002/hello`

在使用 autocannon 时，如果遇到如下错误

> Error: /lib64/libc.so.6: version `GLIBC_2.14' not found (required by /home/nodeuser/.nvm/versions/node/v6.6.0/lib/node_modules/autocannon/node_modules/native-hdr-histogram/lib/binding/node-v48-linux-x64/histogram.node)

参考

<http://www.fatalerrors.org/a/lib64-libc.so.6-version-glibc_2.14-not-found.html>

看是否有 GLIBC_2.14

`strings /lib64/libc.so.6 | grep GLIBC`

没有的话，安装 GLIBC_2.14

```
cd
axel http://ftp.gnu.org/gnu/glibc/glibc-2.14.tar.gz
tar xvf glibc-2.14.tar.gz
cd glibc-2.14
mkdir build
cd ./build
../configure --prefix=/opt/glibc-2.14
make -j4
sudo make install
```

添加库路径

vim ~/.bashrc

`export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/glibc-2.14/lib:`


或者这样使用

`LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/glibc-2.14/lib: autocannon -c 100 http://192.168.200.8:3002/hello`

测试 1

cat server.js

```
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send('hello world');
});

app.listen(3002);
```

`node server.js`

`curl http://192.168.200.8:3002/hello`

`autocannon -c 100 http://192.168.200.8:3002/hello`

```
Running 10s test @ http://192.168.200.8:3002/hello
100 connections

Stat         Avg    Stdev  Max
Latency (ms) 28.54  9.13   128
Req/Sec      3450.5 715.14 4271
Bytes/Sec    743 kB 156 kB 950 kB

34k requests in 10s, 7.42 MB read
```




测试 2

cat server.js

```
const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/hello', (req, res) => {
  res.render('hello', { title: 'Express' });
});

app.listen(3002);
```


cat views/hello.jade

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    h1 = title
```


`node server.js`


`curl http://192.168.200.8:3002/hello`


`autocannon -c 100 http://192.168.200.8:3002/hello`

```
Running 10s test @ http://192.168.200.8:3002/hello
100 connections

Stat         Avg    Stdev   Max
Latency (ms) 330.88 147.11  1301
Req/Sec      298.5  90.9    348
Bytes/Sec    105 kB 31.9 kB 123 kB

3k requests in 10s, 1.05 MB read
```

`NODE_ENV=production node server.js`

`curl http://192.168.200.8:3002/hello`

`autocannon -c 100 http://192.168.200.8:3002/hello`

```
Running 10s test @ http://192.168.200.8:3002/hello
100 connections

Stat         Avg     Stdev  Max
Latency (ms) 30.68   7.03   124
Req/Sec      3211.8  377.88 3499
Bytes/Sec    1.13 MB 128 kB 1.25 MB

32k requests in 10s, 11.3 MB read
```


测试 3

cat server.js


```
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/echo', (req, res) => {
  res.send(req.body);
});

app.listen(3002);
```

`node server.js`



```
curl \
-X POST \
-H "Content-Type: application/json" \
-d '{ "say": "hello" }' \
"http://192.168.200.8:3002/echo"
```



```
autocannon \
-c 100 \
-m POST \
-H "content-type=application/json" \
-b '{ "say": "hello" }' \
http://192.168.200.8:3002/echo
```



```
Running 10s test @ http://192.168.200.8:3002/echo
100 connections

Stat         Avg    Stdev   Max
Latency (ms) 37.22  8.97    140
Req/Sec      2650.7 362.28  2945
Bytes/Sec    600 kB 88.1 kB 688 kB

27k requests in 10s, 5.99 MB read
```






火焰图使用

<https://github.com/davidmarkclements/0x>

`npm install -g 0x`

测试 4

cat server.js

```
const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/hello', (req, res) => {
  res.render('hello', { title: 'Express' });
});

app.listen(3002);
```


cat views/hello.jade

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    h1 = title
```


`sudo ln -s /home/nodeuser/.nvm/versions/node/v6.2.2/bin/node /usr/bin/node`

`/usr/bin/sudo /home/nodeuser/.nvm/versions/node/v6.2.2/bin/0x server.js`

`curl http://192.168.200.8:3002/hello`

`autocannon -c 100 http://192.168.200.8:3002/hello`

```
Running 10s test @ http://192.168.200.8:3002/hello
100 connections

Stat         Avg    Stdev   Max
Latency (ms) 332.89 152.39  1314
Req/Sec      296.2  94.28   348
Bytes/Sec    104 kB 32.9 kB 123 kB

3k requests in 10s, 1.04 MB read
```


生成一个 profile-[pid] 文件夹，里面有火焰图


`NODE_ENV=production /usr/bin/sudo /home/nodeuser/.nvm/versions/node/v6.2.2/bin/0x server.js`

`autocannon -c 100 http://192.168.200.8:3002/hello`






