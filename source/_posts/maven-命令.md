---
title: maven 命令
date: 2019-06-28 16:25:32
tags: [maven, java]
---

```shell
mvn clean package # maven-clean-plugin -> resources -> compiler -> ... -> [jar, war]（打包部署到本地 target 目录）
mvn clean install # maven-clean-plugin -> resources -> compiler -> ... -> [jar, war]（打包部署到本地 target 目录）-> install（-> 布署到本地 maven 仓库）
mvn clean deploy  # maven-clean-plugin -> resources -> compiler -> ... -> [jar, war]（打包部署到本地 target 目录）-> install（-> 布署到本地 maven 仓库）-> deploy（布署到远程 maven 私服仓库）
```
