---
title: url 编码
date: 2017-03-09 13:55:13
tags: [unicode, utf-8, curl, request]
---



和一同事对接一个接口，我这边传给他的中文，他解析出来为乱码（虽然不是中文，其实也不算是乱码，只不过是 url encode 后的值），但是直接使用 curl 命令他那能正常解析。


<!--more-->


* [实验](#实验)
 * [curl 中文](#curl-中文)
 * [request 中文](#request-中文)
 * [curl url encode](#curl-url-encode)
 * [request url encode](#request-url-encode)
* [参考](#参考)

### 实验

我这边是 node 程序，他那是 c++ 程序，我是这样调用他的接口的

request_querystring.js

```
const request = require('request');
const querystring = require('querystring');
let params = {code:1,title:"级",content:"级"}
let requestOptions = {
  url: "http://127.0.0.1:3000?" + querystring.stringify(params),
  method: 'GET'
}
console.log(requestOptions)
request(requestOptions, function (error, response, body) {
})
```

他那是这么显示的

```
code=1&title=%E7%BA%A7&content=%E7%BA%A7
```

其实我认为这样是正确的，只是他那边没有对 url decode，但是他那边不能改，不能改。。。

告诉我 `curl "http://127.0.0.1:3000?code=1&title=级&content=级"` 是可以的，所以不用改

好吧，我们就来看看上面两种方式有什么区别吧。

先用 express 跑一个服务端，我这用的 3000 端口

routes/index.js

```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('req.originalUrl', req.originalUrl);
    console.log('req.query', req.query);
    res.send({code:0});
});

module.exports = router;
```

抓取网络数据包

`sudo tcpdump -i any port 3000 -X`

#### curl 中文

发起请求

```
fred@fred-UBUNTU:~/nodetest$ curl "http://127.0.0.1:3000?code=1&title=级&content=级"
{"code":0}
```

express 打印请求参数
 
```
req.originalUrl /?code=1&title=çº§&content=çº§
req.query { code: '1', title: 'çº§', content: 'çº§' }
GET /?code=1&title=çº§&content=çº§ 200 0.942 ms - 10
```

抓包结果

```
15:38:53.879367 IP localhost.65510 > localhost.3000: Flags [P.], seq 1:108, ack 1, win 128, options [nop,nop,TS val 20894671 ecr 20894671], length 107
	0x0000:  4500 009f f2d8 4000 4006 497e 7f00 0001  E.....@.@.I~....
	0x0010:  7f00 0001 ffe6 0bb8 26bf 211a 3071 55c1  ........&.!.0qU.
	0x0020:  8018 0080 fe93 0000 0101 080a 013e d3cf  .............>..
	0x0030:  013e d3cf 4745 5420 2f3f 636f 6465 3d31  .>..GET./?code=1
	0x0040:  2674 6974 6c65 3de7 baa7 2663 6f6e 7465  &title=...&conte
	0x0050:  6e74 3de7 baa7 2048 5454 502f 312e 310d  nt=....HTTP/1.1.
	0x0060:  0a48 6f73 743a 2031 3237 2e30 2e30 2e31  .Host:.127.0.0.1
	0x0070:  3a33 3030 300d 0a55 7365 722d 4167 656e  :3000..User-Agen
	0x0080:  743a 2063 7572 6c2f 372e 3437 2e30 0d0a  t:.curl/7.47.0..
	0x0090:  4163 6365 7074 3a20 2a2f 2a0d 0a0d 0a    Accept:.*/*....
```

参考 [tcpdump-分析-ping-命令](../../../../2017/01/16/tcpdump-分析-ping-命令/) 重点看以下这句

`0x0040:  2674 6974 6c65 3de7 baa7 2663 6f6e 7465  &title=...&conte`

根据 <http://ascii.cl/> 

`3d` 为 `=`

`26` 为 `&`

中间的 `...` 对应的是 title 的内容，也就是 `e7 baa7` 

根据 <http://www.tamasoft.co.jp/en/general-info/unicode.html> 找到 `级` 的 unicode 编码为 `7EA7`

或者用工具 <http://tool.chinaz.com/tools/unicode.aspx> 获取

再根据 <http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html> 可以算出相应的 utf-8 编码

或者用工具 <http://tool.chinaz.com/tools/urlencode.aspx> 得到 `级` url encode 后为 `%e7%ba%a7`， 去掉 % 即为 `e7baa7`

推测结论 curl 命令，对 url encode 没有加 %


#### request 中文

request.js

```
const request = require('request');
let requestOptions = {
  url: "http://127.0.0.1:3000?code=1&title=级&content=级",
  method: 'GET'
}
console.log(requestOptions)
request(requestOptions, function (error, response, body) {
})
```

发起请求

```
fred@fred-UBUNTU:~/nodetest$ node request.js
{ url: 'http://127.0.0.1:3000?code=1&title=级&content=级',
  method: 'GET' }
```
express 打印请求参数

```
req.originalUrl /?code=1&title=§&content=§
req.query { code: '1', title: '§', content: '§' }
GET /?code=1&title=§&content=§ 200 0.437 ms - 10
```

抓包结果

```
15:38:02.613744 IP localhost.65506 > localhost.3000: Flags [P.], seq 1:85, ack 1, win 128, options [nop,nop,TS val 20881855 ecr 20881854], length 84
	0x0000:  4500 0088 51a4 4000 4006 eac9 7f00 0001  E...Q.@.@.......
	0x0010:  7f00 0001 ffe2 0bb8 4eea f01d d359 0885  ........N....Y..
	0x0020:  8018 0080 fe7c 0000 0101 080a 013e a1bf  .....|.......>..
	0x0030:  013e a1be 4745 5420 2f3f 636f 6465 3d31  .>..GET./?code=1
	0x0040:  2674 6974 6c65 3da7 2663 6f6e 7465 6e74  &title=.&content
	0x0050:  3da7 2048 5454 502f 312e 310d 0a68 6f73  =..HTTP/1.1..hos
	0x0060:  743a 2031 3237 2e30 2e30 2e31 3a33 3030  t:.127.0.0.1:300
	0x0070:  300d 0a43 6f6e 6e65 6374 696f 6e3a 2063  0..Connection:.c
	0x0080:  6c6f 7365 0d0a 0d0a                      lose....
```

title 的内容为 `a7`

推测 request url encode 时，只留下了一个字节（只是瞎推测，没看源代码的）

#### curl url encode

发起请求

```
fred@fred-UBUNTU:~/nodetest$ node request_querystring.js
{ url: 'http://127.0.0.1:3000?code=1&title=%E7%BA%A7&content=%E7%BA%A7',
  method: 'GET' }
```

express 打印请求参数

```
req.originalUrl /?code=1&title=%E7%BA%A7&content=%E7%BA%A7
req.query { code: '1', title: '级', content: '级' }
GET /?code=1&title=%E7%BA%A7&content=%E7%BA%A7 200 0.381 ms - 10
```

抓包结果

```
15:33:38.162975 IP localhost.65492 > localhost.3000: Flags [P.], seq 1:101, ack 1, win 128, options [nop,nop,TS val 20815742 ecr 20815742], length 100
	0x0000:  4500 0098 2da8 4000 4006 0eb6 7f00 0001  E...-.@.@.......
	0x0010:  7f00 0001 ffd4 0bb8 cc82 b2d9 1405 cacf  ................
	0x0020:  8018 0080 fe8c 0000 0101 080a 013d 9f7e  .............=.~
	0x0030:  013d 9f7e 4745 5420 2f3f 636f 6465 3d31  .=.~GET./?code=1
	0x0040:  2674 6974 6c65 3d25 4537 2542 4125 4137  &title=%E7%BA%A7
	0x0050:  2663 6f6e 7465 6e74 3d25 4537 2542 4125  &content=%E7%BA%
	0x0060:  4137 2048 5454 502f 312e 310d 0a68 6f73  A7.HTTP/1.1..hos
	0x0070:  743a 2031 3237 2e30 2e30 2e31 3a33 3030  t:.127.0.0.1:300
	0x0080:  300d 0a43 6f6e 6e65 6374 696f 6e3a 2063  0..Connection:.c
	0x0090:  6c6f 7365 0d0a 0d0a                      lose....
```

#### request url encode

发起请求

```
fred@fred-UBUNTU:~/nodetest$ curl 'http://127.0.0.1:3000?code=1&title=%E7%BA%A7&content=%E7%BA%A7'
{"code":0}
```

express 打印请求参数

```
req.originalUrl /?code=1&title=%E7%BA%A7&content=%E7%BA%A7
req.query { code: '1', title: '级', content: '级' }
GET /?code=1&title=%E7%BA%A7&content=%E7%BA%A7 200 0.811 ms - 10
```

抓包结果

```
15:36:57.372820 IP localhost.65500 > localhost.3000: Flags [P.], seq 1:120, ack 1, win 128, options [nop,nop,TS val 20865545 ecr 20865545], length 119
	0x0000:  4500 00ab d003 4000 4006 6c47 7f00 0001  E.....@.@.lG....
	0x0010:  7f00 0001 ffdc 0bb8 7183 b209 d7f1 f155  ........q......U
	0x0020:  8018 0080 fe9f 0000 0101 080a 013e 6209  .............>b.
	0x0030:  013e 6209 4745 5420 2f3f 636f 6465 3d31  .>b.GET./?code=1
	0x0040:  2674 6974 6c65 3d25 4537 2542 4125 4137  &title=%E7%BA%A7
	0x0050:  2663 6f6e 7465 6e74 3d25 4537 2542 4125  &content=%E7%BA%
	0x0060:  4137 2048 5454 502f 312e 310d 0a48 6f73  A7.HTTP/1.1..Hos
	0x0070:  743a 2031 3237 2e30 2e30 2e31 3a33 3030  t:.127.0.0.1:300
	0x0080:  300d 0a55 7365 722d 4167 656e 743a 2063  0..User-Agent:.c
	0x0090:  7572 6c2f 372e 3437 2e30 0d0a 4163 6365  url/7.47.0..Acce
	0x00a0:  7074 3a20 2a2f 2a0d 0a0d 0a              pt:.*/*....
```

### 参考

* <http://www.ruanyifeng.com/blog/2010/02/url_encoding.html>
* <http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html>
* [ASCII、Unicode、GBK和UTF-8字符编码的区别联系](../../../../2016/08/30/ASCII、Unicode、GBK和UTF-8字符编码的区别联系/)
* [tcpdump-分析-ping-命令](../../../../2017/01/16/tcpdump-分析-ping-命令/)