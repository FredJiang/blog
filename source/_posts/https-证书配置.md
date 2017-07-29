---
title: https 证书配置
date: 2017-06-21 12:48:21
tags: [https, nginx, ssl]
---


执行命令

```
git clone https://github.com/letsencrypt/letsencrypt
cd letsencrypt
sudo service nginx status
sudo service nginx stop
sudo ./letsencrypt-auto certonly --standalone --email 270130108@qq.com -d example.com
sudo service nginx start
```

<!--more-->

nginx 配置

```
listen [::]:443 ssl;
listen 443      ssl;

ssl_certificate         /etc/letsencrypt/live/example.com/fullchain.pem;
ssl_certificate_key     /etc/letsencrypt/live/example.com/privkey.pem;
ssl_trusted_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
```


```
sudo crontab -e
```


* <https://clearleft.com/posts/357>
* <https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-14-04>
