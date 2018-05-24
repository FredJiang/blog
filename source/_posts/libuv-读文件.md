---
title: libuv 读文件
date: 2017-04-03 21:05:34
tags: [libuv, node.js, c++]
---

参考

* [libuv-事件循环](../../../../2017/03/31/libuv-事件循环/)
* <https://nikhilm.github.io/uvbook/filesystem.html>
* <http://docs.libuv.org/en/v1.x/fs.html>

<!--more-->

main.c

```
#include <stdio.h>
#include <stdlib.h>
#include <uv.h>
#include <assert.h>

void on_open(uv_fs_t *req);
void on_read(uv_fs_t *req);
void on_write(uv_fs_t *req);

uv_fs_t open_req;
uv_fs_t close_req;
uv_fs_t write_req;
uv_fs_t read_req;
//UV_EXTERN int uv_fs_read(uv_loop_t* loop,
//                         uv_fs_t* req,
//                         uv_file file,
//                         const uv_buf_t bufs[],
//                         unsigned int nbufs,
//                         int64_t offset,
//                         uv_fs_cb cb);
uv_buf_t iov;
//UV_EXTERN uv_buf_t uv_buf_init(char* base, unsigned int len);
char buffer[10];

void on_open(uv_fs_t *req) {
  // The request passed to the callback is the same as the one the call setup
  // function was passed.
  assert(req == &open_req);
  if (req->result >= 0) {
    iov = uv_buf_init(buffer, sizeof(buffer));
    uv_fs_read(uv_default_loop(), &read_req, req->result,
	       &iov, 1, -1, on_read);
  }
  else {
    fprintf(stderr, "error opening file: %s\n", uv_strerror((int)req->result));
  }
}

void on_read(uv_fs_t *req) {
  if (req->result < 0) {
    fprintf(stderr, "Read error: %s\n", uv_strerror(req->result));
  }
  else if (req->result == 0) {
    uv_fs_t close_req;
    // synchronous
    uv_fs_close(uv_default_loop(), &close_req, open_req.result, NULL);
  }
  else if (req->result > 0) {
    iov.len = req->result;
    uv_fs_write(uv_default_loop(), &write_req, 1, &iov, 1, -1, on_write);
  }
}

void on_write(uv_fs_t *req) {
  if (req->result < 0) {
    fprintf(stderr, "Write error: %s\n", uv_strerror((int)req->result));
  }
  else {
    uv_fs_read(uv_default_loop(), &read_req, open_req.result, &iov, 1, -1, on_read);
  }
}

int main(int argc, char **argv) {
  //http://docs.libuv.org/en/v1.x/fs.html
  uv_fs_open(uv_default_loop(), &open_req, argv[1], O_RDONLY, 0, on_open);
  uv_run(uv_default_loop(), UV_RUN_DEFAULT);

  uv_fs_req_cleanup(&open_req);
  uv_fs_req_cleanup(&read_req);
  uv_fs_req_cleanup(&write_req);
  return 0;
}
```

```
gcc -o main main.c /usr/local/lib/libuv.a -pthread
```

```
./main input.txt
```