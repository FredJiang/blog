---
title: 导出 docker 中的 mongo 数据
date: 2017-06-04 23:54:09
tags: [mongo, docker]
---

参考

* <https://github.com/FredJiang/myshell/blob/master/dockerbash>

<!--more-->

```
docker ps

docker inspect docker-mongo

"Mounts": [
    {
        "Name": "e5cd64a2cf83850618c0cd048602e33dc0bce2007925d26a176b9db6620ba450",
        "Source": "/var/lib/docker/volumes/e5cd64a2cf83850618c0cd048602e33dc0bce2007925d26a176b9db6620ba450/_data",
        "Destination": "/data/db",
        "Driver": "local",
        "Mode": "",
        "RW": true
    }
]

dockerbash docker-mongo

mongodump -o /data/db/backupByFred

mongorestore -d yaoxin --drop /var/lib/docker/volumes/e5cd64a2cf83850618c0cd048602e33dc0bce2007925d26a176b9db6620ba450/_data/backupByFred/yaoxin/
```

