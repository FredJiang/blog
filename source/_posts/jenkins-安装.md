---
title: jenkins 安装
date: 2017-07-26 19:15:21
tags: [jenkins]
---

## 在 ubuntu 下安装

<https://wiki.jenkins.io/display/JENKINS/Installing+Jenkins+on+Ubuntu>

<!--more-->

### install jenkins

```
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```

### install nginx

```
sudo apt-get install -y nginx
```



### config nginx

这里和 jenkins 官网的配置方法不一样

```
sudo cat > /etc/nginx/conf.d/jenkins.conf
upstream app_server {
    server 127.0.0.1:8080 fail_timeout=0;
}

server {
    listen 80;
    server_name ci.yourcompany.com;
 
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
 
        if (!-f $request_filename) {
            proxy_pass http://app_server;
            break;
        }
    }
}
^D # Hit CTRL + D to finish writing the file
```

### 重新加载 nginx 配置文件

```
sudo nginx -t
sudo nginx -s reload
```

### 浏览器访问

`http://ci.yourcompany.com`

在服务器上获取密码

`cat /var/lib/jenkins/secrets/initialAdminPassword`
