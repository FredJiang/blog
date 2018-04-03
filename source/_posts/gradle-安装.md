---
title: gradle 安装
date: 2017-12-29 14:49:50
tags: [gradle, java]
---

<https://gradle.org/install/>

在 centos 上

安装 java

安装 sdkman

<!--more-->

<http://sdkman.io/install.html>

```
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk version
```

安装 gradle

```
sdk install gradle 4.4.1
gradle -v
```



如果慢的话，可以手动安装

```
axel "https://services.gradle.org/distributions/gradle-4.4.1-bin.zip"
mkdir /opt/gradle
unzip -d /opt/gradle gradle-4.4.1-bin.zip
ls /opt/gradle/gradle-4.4.1
export PATH=$PATH:/opt/gradle/gradle-4.4.1/bin
```



```
# aliyun
cd /usr/share/nginx/html/gradle && \
axel "http://127.0.0.1/gradle/gradle-4.4.1-all.zip" && \
axel "http://127.0.0.1/gradle/gradle-4.4.1-all.zip.sha256" && \
axel "http://127.0.0.1/gradle/gradle-4.4.1-bin.zip.sha256" && \
axel "http://127.0.0.1/gradle/gradle-4.4.1-bin.zip" && \

# local
cd /var/www/html/gradle && \
axel "http://127.0.0.1/gradle/gradle-4.4.1-all.zip" && \
axel "http://127.0.0.1/gradle/gradle-4.4.1-all.zip.sha256" && \
axel "http://127.0.0.1/gradle/gradle-4.4.1-bin.zip.sha256" && \
axel "http://127.0.0.1/gradle/gradle-4.4.1-bin.zip" && \
```




在 mac 上

`brew install gradle`


