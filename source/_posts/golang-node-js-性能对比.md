---
title: golang node.js 性能对比
date: 2017-10-24 17:38:07
tags: [golang, node.js, wrk, test, http, perf, optimize, c, select, poll]
---

cat app.js

```
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end('{ "code": 0 }');
});

server.listen(3002);
```

<!--more-->

cat main.go

```
package main

import (
    "fmt"
    "log"
    "net/http"
)

func httpHandle(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    fmt.Fprintf(w, "{ \"code\": 0 }")
}

func main() {
    http.HandleFunc("/", httpHandle)
    err := http.ListenAndServe(":3002", nil)
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}
```


wrk 测试

```
git clone https://github.com/wg/wrk
cd wrk
make
./wrk -t12 -c400 -d30s http://192.168.200.8:3002
```


node app.js

{% asset_img "1.png" "" %}

```
./wrk -t12 -c400 -d30s http://192.168.200.8:3002
Running 30s test @ http://192.168.200.8:3002
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    50.21ms   11.58ms 328.85ms   84.51%
    Req/Sec   649.80    154.18     1.80k    75.70%
  227854 requests in 30.04s, 31.51MB read
Requests/sec:   7586.15
Transfer/sec:      1.05MB

./wrk -t12 -c400 -d30s http://192.168.200.8:3002
Running 30s test @ http://192.168.200.8:3002
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    48.20ms   10.53ms 351.98ms   94.90%
    Req/Sec   677.44    119.62     1.05k    81.92%
  242897 requests in 30.03s, 33.59MB read
Requests/sec:   8088.83
Transfer/sec:      1.12MB
```


pm2 start app.js -i 0

{% asset_img "2.png" "" %}

```
./wrk -t12 -c400 -d30s http://192.168.200.8:3002
Running 30s test @ http://192.168.200.8:3002
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    14.10ms   13.00ms 459.67ms   98.22%
    Req/Sec     2.43k   346.74     4.48k    83.06%
  861396 requests in 30.04s, 119.12MB read
Requests/sec:  28679.48
Transfer/sec:      3.97MB

./wrk -t12 -c400 -d30s http://192.168.200.8:3002
Running 30s test @ http://192.168.200.8:3002
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    13.50ms    8.25ms 327.42ms   95.97%
    Req/Sec     2.49k   359.21     8.46k    78.59%
  891896 requests in 30.04s, 123.33MB read
Requests/sec:  29686.20
Transfer/sec:      4.11MB
```




go run main.go

{% asset_img "3.png" "" %}

```
./wrk -t12 -c400 -d30s http://192.168.200.8:3002
Running 30s test @ http://192.168.200.8:3002
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     7.39ms    4.89ms 228.02ms   88.08%
    Req/Sec     4.49k   587.87    14.11k    76.85%
  1609365 requests in 30.09s, 185.71MB read
Requests/sec:  53488.80
Transfer/sec:      6.17MB

./wrk -t12 -c400 -d30s http://192.168.200.8:3002
Running 30s test @ http://192.168.200.8:3002
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     7.67ms    3.94ms  61.83ms   79.68%
    Req/Sec     4.34k   622.41    18.11k    81.02%
  1556542 requests in 30.10s, 179.62MB read
Requests/sec:  51719.33
Transfer/sec:      5.97MB
```



歪个楼，再补一个 c 的

cat server.c

```
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <err.h>

char response[] = "HTTP/1.1 200 OK\r\n"
                  "Content-Type: text/html; charset=UTF-8\r\n"
                  "Content-Length: 13\r\n"
                  "\r\n"
                  "{ \"code\": 0 }";

int main() {
  int optval = 1;
  int client_fd;
  struct sockaddr_in svr_addr, cli_addr;
  socklen_t sin_len = sizeof(cli_addr);

  int sock = socket(AF_INET, SOCK_STREAM, 0);
  if (sock < 0) {
    err(1, "can't open socket");
  }

  setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &optval, sizeof(int));

  int port = 3002;
  svr_addr.sin_family = AF_INET;
  svr_addr.sin_addr.s_addr = INADDR_ANY;
  svr_addr.sin_port = htons(port);

  if (bind(sock, (struct sockaddr *)&svr_addr, sizeof(svr_addr)) == -1) {
    close(sock);
    err(1, "Can't bind");
  }

  listen(sock, 5);
  while (1) {
    client_fd = accept(sock, (struct sockaddr *)&cli_addr, &sin_len);

    if (client_fd == -1) {
      perror("Can't accept");
      continue;
    }

    write(client_fd, response, sizeof(response) - 1);
    close(client_fd);
  }
}
```

```
gcc server.c -o server
./server
```


```
 ./wrk -t12 -c400 -d30s http://192.168.200.8:3002
Running 30s test @ http://192.168.200.8:3002
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    32.41ms  121.63ms   1.53s    93.88%
    Req/Sec   701.26    496.63     3.89k    69.17%
  245468 requests in 30.05s, 21.54MB read
  Socket errors: connect 0, read 60324, write 185157, timeout 35
Requests/sec:   8169.85
Transfer/sec:    734.01KB
 ./wrk -t12 -c400 -d30s http://192.168.200.8:3002
Running 30s test @ http://192.168.200.8:3002
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    33.21ms  124.82ms   1.52s    94.02%
    Req/Sec   690.71    525.30     4.89k    69.57%
  239746 requests in 30.04s, 21.03MB read
  Socket errors: connect 0, read 58983, write 180775, timeout 52
Requests/sec:   7980.74
Transfer/sec:    717.02KB
```


这个性能不理想，肯定是我的姿势不对。


`listen(sock, 5);` 变为 `listen(sock, 1024);`


```
./wrk -t12 -c400 -d30s http://192.168.200.8:3002
Running 30s test @ http://192.168.200.8:3002
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    21.46ms   67.79ms   1.42s    94.48%
    Req/Sec     1.26k   376.78     4.14k    69.34%
  452800 requests in 30.09s, 39.73MB read
  Socket errors: connect 0, read 25376, write 427431, timeout 1
Requests/sec:  15048.15
Transfer/sec:      1.32MB
./wrk -t12 -c400 -d30s http://192.168.200.8:3002
Running 30s test @ http://192.168.200.8:3002
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    24.63ms   87.21ms   1.61s    94.97%
    Req/Sec     1.23k   441.71     3.19k    72.21%
  441398 requests in 30.07s, 38.73MB read
  Socket errors: connect 0, read 28206, write 413219, timeout 9
Requests/sec:  14676.93
Transfer/sec:      1.29MB
```
