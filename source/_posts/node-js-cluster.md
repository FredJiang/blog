---
title: node.js cluster
date: 2017-11-05 12:25:50
tags: [node.js, cluster]
---

cat clusterdemo.js

<!--more-->

```
const gLogger = require('tracer').console();
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

gLogger.log(`numCPUs ${numCPUs}`);
gLogger.log(`cluster.isMaster ${cluster.isMaster} process.pid ${process.pid}`);

// const workerHandler = (worker) => {
//   worker.on('message', (message) => {
//     gLogger.log(`cluster.isMaster ${cluster.isMaster} process.pid ${process.pid} message ${message}`);
//   });
//   worker.send('hello from the master');
// };

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    let worker = cluster.fork();
    // workerHandler(worker);
  }

  // cluster.on('online', (worker) => {
  //   gLogger.log(`cluster.isMaster ${cluster.isMaster} Worker ${worker.process.pid} is online`);
  // });

  // cluster.on('exit', (worker, code, signal) => {
  //   gLogger.log(`cluster.isMaster ${cluster.isMaster} Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
  //   gLogger.log(`cluster.isMaster ${cluster.isMaster} Starting a new worker`);
  //   let workerNew = cluster.fork();
  //   workerHandler(workerNew);
  // });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`cluster.isMaster ${cluster.isMaster} process.pid ${process.pid}\n`);
  }).listen(8000);

  // process.on('message', (message) => {
  //   gLogger.log(`cluster.isMaster ${cluster.isMaster} process.pid ${process.pid} message ${message}`);
  // });
  // process.send(`hello from worker with process.pid ${process.pid}`);
}
```

`node clusterdemo.js`

发起 http 请求

```
counter=1
while [ $counter -le 9 ]
do
  curl "http://127.0.0.1:8000"
  (( counter++ ))
done
```

查看端口

`lsof -i:8000`

只有 master 在监听该端口
worker 没有监听端口，原因在这 <https://nodejs.org/api/cluster.html#cluster_how_it_works>


参考

* <https://www.sitepoint.com/how-to-create-a-node-js-cluster-for-speeding-up-your-apps/>
* <http://stackabuse.com/setting-up-a-node-js-cluster/>
* <https://keymetrics.io/2015/03/26/pm2-clustering-made-easy/>


