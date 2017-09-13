---
title: linux /proc 笔记
date: 2016-11-30 09:49:05
tags: [linux, proc, env]
---


#### /proc/$PID/environ

`(cat environ; echo) | tr '\000' '\n'`

```
PID=28736
(cat /proc/$PID/environ; echo) | tr '\000' '\n'
```



#### /proc/$PID/wchan

* <http://askubuntu.com/questions/19442/what-is-the-waiting-channel-of-a-process>



#### /proc/$PID/syscall

* <http://blog.tanelpoder.com/2013/02/21/peeking-into-linux-kernel-land-using-proc-filesystem-for-quickndirty-troubleshooting/>



#### /proc/$PID/maps

* <http://stackoverflow.com/questions/1401359/understanding-linux-proc-id-maps>

`cat maps | column -t -s " "`

#### /proc/$PID/smaps

* <https://mail.gnome.org/archives/gnome-list/1999-September/msg00036.html>
* <http://stackoverflow.com/questions/9922928/what-does-pss-mean-in-proc-pid-smaps>

#### man proc


<http://advancedlinuxprogramming.com/alp-folder/alp-ch07-proc-filesystem.pdf>