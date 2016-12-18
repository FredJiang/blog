---
title: UNIX 网络编程 笔记 3 -- daytimetcpsrv.c
date: 2016-11-24 20:07:37
tags: [socket, unix, network, UNIX 网络编程]
---


#### Socket

封装的函数在 `/yourpath/unpv13e/lib/wrapsock.c` 这个文件里面, 如 

```
287  /* include Socket */
288  int                                                                                                                                                                          
289  Socket(int family, int type, int protocol)                                                                                                                                   
290  {                                                                                                                                                                            
291          int             n;                                                                                                                                                   
292                                                                                                                                                                               
293          if ( (n = socket(family, type, protocol)) < 0)                                                                                                                       
294                  err_sys("socket error");                                                                                                                                     
295          return(n);                                                                                                                                                           
296  }
297  /* end Socket */
```

#### sockaddr_in

* <http://www.cppblog.com/lf426/archive/2008/07/10/55800.html>
* <http://cjjjs.baijia.baidu.com/article/352708>
* <http://cjjjs.baijia.baidu.com/article/352683>


#### htonl htons INADDR_ANY

* <http://www.cnblogs.com/zhangjing0502/archive/2012/06/26/2564025.html>

#### Listen backlog

* <http://c.biancheng.net/cpp/html/3036.html>


#### 其他

* <http://www.cnblogs.com/drfxiaoliuzi/p/5479906.html>
* <http://www.cnblogs.com/skynet/archive/2010/12/12/1903949.html>