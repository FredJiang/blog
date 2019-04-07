---
title: docker 镜像
date: 2018-07-23 22:44:37
tags: [docker, mirror, image]
---

* <https://yeasy.gitbooks.io/docker_practice/install/mirror.html>
* <https://docs.docker.com/registry/recipes/mirror/#use-case-the-china-registry-mirror>
* <https://kirk-enterprise.github.io/hub-docs/#/user-guide/mirror>

<!--more-->

```bash
docker pull                                openjdk:8
# 或
docker pull registry.docker-cn.com/library/openjdk:8
# 或
docker pull   reg-mirror.qiniu.com/library/openjdk:8 # 最快

# 其他镜像，如果下载失败，可以试着把路径中的 library 去掉
```