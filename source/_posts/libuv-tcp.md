---
title: libuv tcp
date: 2017-04-04 01:25:56
tags: [libuv, node.js, c++]
---

参考

* <https://nikhilm.github.io/uvbook/networking.html>
* [libuv-事件循环](../../../../2017/03/31/libuv-事件循环/)
* [libuv-读文件](../../../../2017/04/03/libuv-读文件/)

<!--more-->

main.c

```
#include <stdio.h>
#include <stdlib.h>
#include <uv.h>

#define DEFAULT_PORT 3000
#define DEFAULT_BACKLOG 128

uv_tcp_t *client;

void on_client_write(uv_write_t *req, int status);

void alloc_buffer(uv_handle_t* handle,
		  size_t suggested_size,
		  uv_buf_t* buf) {
  printf("alloc_buffer\n");
  // UV_EXTERN uv_buf_t uv_buf_init(char* base, unsigned int len);
  *buf = uv_buf_init((char*) malloc(suggested_size), suggested_size);
}

void echo_read(uv_stream_t* stream,
	       ssize_t nread,
	       const uv_buf_t* buf) {
  printf("echo_read\n");

  if (nread == -1) {
    fprintf(stderr, "error echo_read");
    return;
  }

  printf(" %s\n",  buf->base);

  char buffer[100];
  uv_buf_t buf_write = uv_buf_init(buffer, sizeof(buffer));
  buf_write.len = nread;
  buf_write.base = buf->base;
  int buf_write_count = 1;
  uv_write_t *write_req = (uv_write_t *) malloc(sizeof(uv_write_t));
  uv_write(write_req, (uv_stream_t*) client, &buf_write, buf_write_count, on_client_write);
}


void on_client_write(uv_write_t *req, int status) {
  if (status == -1) {
    fprintf(stderr, "error on_client_write");
    uv_close((uv_handle_t*) client, NULL);
    return;
  }

  free(req);

  char *buffer = (char*) req->data;
  free(buffer);
}

void on_new_connection(uv_stream_t *server, int status) {
  if (status < 0) {
    fprintf(stderr, "New connection error %s\n", uv_strerror(status));
    // error!
    return;
  }

  client = (uv_tcp_t*) malloc(sizeof(uv_tcp_t));
  uv_loop_t *loop = uv_default_loop();
  uv_tcp_init(loop, client);
  if (uv_accept(server, (uv_stream_t*) client) == 0) {

    //  UV_EXTERN int uv_read_start(uv_stream_t*,
    //                          uv_alloc_cb alloc_cb,
    //                          uv_read_cb read_cb);

    // typedef void (*uv_alloc_cb)(uv_handle_t* handle,
    //                         size_t suggested_size,
    //                         uv_buf_t* buf);

    // typedef void (*uv_read_cb)(uv_stream_t* stream,
    //                            ssize_t nread,
    //                            const uv_buf_t* buf);

    uv_read_start((uv_stream_t*) client, alloc_buffer, echo_read);
  }
  else {
    uv_close((uv_handle_t*) client, NULL);
  }
}

int main() {
  uv_loop_t *loop = uv_default_loop();
  uv_tcp_t server;
  uv_tcp_init(loop, &server);

  // UV_EXTERN int uv_ip4_addr(const char* ip, int port, struct sockaddr_in* addr);
  struct sockaddr_in addr;
  uv_ip4_addr("0.0.0.0", DEFAULT_PORT, &addr);

  uv_tcp_bind(&server, (const struct sockaddr*)&addr, 0);
  // UV_EXTERN int uv_listen(uv_stream_t* stream, int backlog, uv_connection_cb cb);
  // typedef void (*uv_connection_cb)(uv_stream_t* server, int status);
  int r = uv_listen((uv_stream_t*) &server, DEFAULT_BACKLOG, on_new_connection);
  if (r) {
    fprintf(stderr, "Listen error %s\n", uv_strerror(r));
    return 1;
  }
  return uv_run(loop, UV_RUN_DEFAULT);
}
```

```
gcc -o main main.c /usr/local/lib/libuv.a -pthread
```

{% asset_img "libuv-tcp.png" "" %}

