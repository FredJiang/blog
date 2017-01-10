---
title: UNIX 网络编程 笔记 9 -- gethostbyname
date: 2016-12-30 08:37:41
tags: [socket, unix, network, UNIX 网络编程]
---


通过域名获取 ip 地址

<!--more-->

```
#include	"../lib/unp.h"

int
main(int argc, char **argv)
{
  char			*ptr, **pptr;
  char			 str[INET_ADDRSTRLEN];
  struct hostent	*hptr;

  while (--argc > 0) {
    ptr				      = *++argv;
    if ( (hptr = gethostbyname(ptr)) == NULL) {
      err_msg("gethostbyname error for host: %s: %s",
	      ptr, hstrerror(h_errno));
      continue;
    }
    printf("official hostname: %s\n", hptr->h_name);

    for (pptr = hptr->h_aliases; *pptr != NULL; pptr++)
      printf("\talias: %s\n", *pptr);

    switch (hptr->h_addrtype) {
    case AF_INET:
      pptr = hptr->h_addr_list;
      for ( ; *pptr != NULL; pptr++)
	printf("\taddress: %s\n",
	       Inet_ntop(hptr->h_addrtype, *pptr, str, sizeof(str)));
      break;

    default:
      err_ret("unknown address type");
      break;
    }
  }
  exit(0);
}
```


```
gcc hostent.c -o hostent -lunp
```


```
[fred@iZ28zknjosgZ names]$ ./hostent baidu
official hostname: baidu
	address: 127.0.53.53
[fred@iZ28zknjosgZ names]$ ./hostent baidu.com
official hostname: baidu.com
	address: 123.125.114.144
	address: 111.13.101.208
	address: 220.181.57.217
	address: 180.149.132.47
[fred@iZ28zknjosgZ names]$ ./hostent baidu.cn
official hostname: baidu.cn
	address: 111.13.101.208
	address: 220.181.57.217
	address: 180.149.132.47
	address: 123.125.114.144
```