---
title: docker 镜像
date: 2018-07-23 22:44:37
tags: [docker, mirror, image]
---

* <https://kirk-enterprise.github.io/hub-docs/#/user-guide/mirror>
* <https://docs.docker.com/registry/recipes/mirror/#use-case-the-china-registry-mirror>

<!--more-->

```sh
docker pull                                openjdk:8
# 或
docker pull registry.docker-cn.com/library/openjdk:8
# 或
docker pull   reg-mirror.qiniu.com/library/openjdk:8 # 最快

# 其他镜像，如果下载失败，可以试着把路径中的 library 去掉
```

```sh
curl -sSL 'http://oyh1cogl9.bkt.clouddn.com/setmirror.sh' | bash -s 'https://reg-mirror.qiniu.com'
# 或
curl -sSL 'http://oyh1cogl9.bkt.clouddn.com/setmirror.sh' | sh   -s 'https://reg-mirror.qiniu.com'

# 根据提示，重启 docker（ubuntu）
sudo systemctl restart docker.service
docker info

# 根据提示，重启 docker（centos）
sudo systemctl restart docker
docker info
```
