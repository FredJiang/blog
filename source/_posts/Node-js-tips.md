---
title: node.js tips
date: 2016-04-26 19:03:32
tags: [node.js, ES6, ES2015]
---


这些窍门和最佳实践不仅针对普通的开发，还包括 Node.js 的基本操作，怎么做日常的开发以及其他的一些建议。


<!--more-->

###### 使用 ES2015

2015 年夏 [ES2015草案](http://www.ecma-international.org/ecma-262/6.0/index.html)（ES6）发布了。其中包括了一些新的语言特性：

* arrow functions,
* template strings,
* rest operator, argument spreading,
* generators,
* promises,
* maps, sets,
* symbols,

更多新特性可参考 [ES6 and Beyond](https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20%26%20beyond)

Node.js 中 ES6 的实现情况，戳这里 <https://nodejs.org/en/docs/es6/>

###### callback 写法支持 Promise

* 为了向前兼容 callback 和向后兼容 Promise
* error-first callback，callback 的第一个参数为 error

上代码

```
const fs = require('fs')

function readPackage (callback) {
  //as of now we do not have default values in Node.js
  callback = callback || function () {}
  return new Promise((resolve, reject) => {
    fs.readFile('./package.json', (err, data) => {
      if (err) {
        reject(err)
        return callback(err)
      }
      resolve(data)
      return callback(null, data)
    })
  })
}

module.exports.readPackage = readPackage
```

###### 在 Promises 中处理 error

```
Promise.resolve(() => 'John')
  .then(() => {
    throw new Error('ops')
  })
  .catch((ex) => {
    console.log(ex)
  })
  .then(() => {
    throw new Error('ups')
    console.log('Doe')
  })
```

上面代码输出 `[Error: ops]`，最后一个 then 里面的 error catch 不了。

```
Promise.resolve(() => 'John')
  .then(() => {
    throw new Error('ops')
  })
  .catch((ex) => {
    console.log(ex)
  })
  .then(() => {
    throw new Error('ups')
    console.log('Doe')
  })
  .catch((ex) => {
    console.log(ex)
  })
```

上面代码输出为

```
[Error: ops]
[Error: ups]
```

所以 catch 要写在 Promise 的最后

###### 监视程序状态

开源的可以使用 [Zabbix](http://www.zabbix.com/)，[Collectd](https://collectd.org/)，[ElasticSearch](https://www.elastic.co/products/elasticsearch)，[Logstash](https://www.elastic.co/products/logstash)


[参考](https://blog.risingstack.com/how-to-become-a-better-node-js-developer-in-2016/)