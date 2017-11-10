---
title: poll 使用
date: 2017-10-30 23:17:02
tags: [c, poll]
---

```
#include <stdio.h>
#include <unistd.h>
#include <poll.h>

#define TIMEOUT 5

int main(void) {
  struct pollfd fds[2];
  int ret;

  fds[0].fd = STDIN_FILENO;
  fds[0].events = POLLIN;

  fds[1].fd = STDOUT_FILENO;
  fds[1].events = POLLOUT;

  ret = poll(fds, 2, TIMEOUT * 1000);

  printf("ret is %d\n", ret);

  if (ret == -1) {
    perror("poll");
    return 1;
  }

  if (!ret) {
    printf("%d seconds elapsed.\n", TIMEOUT);
    return 0;
  }

  if (fds[0].revents & POLLIN) {
    printf("stdin is readable\n");
  }

  if (fds[1].revents & POLLOUT) {
    printf("stdout is writable\n");
  }
  return 0;
}
```

<!--more-->

`./poll`


输出

```
ret is 1
stdout is writable
```


`./poll < tmp.txt`

输出

```
ret is 2
stdin is readable
stdout is writabl
```
