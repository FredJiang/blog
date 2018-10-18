---
title: https 证书配置
date: 2017-06-21 12:48:21
tags: [https, nginx, ssl, letsencrypt]
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

mac [brew](https://github.com/Homebrew/homebrew-services) nginx

```
brew services list
sudo brew services stop  nginx
sudo brew services start nginx
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



```
upstream yourDomain {
    server 192.168.1.2:8080 weight=2 max_fails=2 fail_timeout=10s;
}

server {
    client_max_body_size    4G;
    listen                  443;
    server_name             yourDomain;
    ssl on;
    ssl_certificate         /etc/nginx/ssl/ssl/yourDomain.crt;
    ssl_certificate_key     /etc/nginx/ssl/ssl/yourDomain.key;

    access_log /var/log/nginx/yourDomain_access.log;
    error_log  /var/log/nginx/yourDomain_error.log;

    location / {
        proxy_set_header    X-Real-IP         $remote_addr;
        proxy_set_header    X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header    X-Forwarded-Proto $scheme;
        proxy_set_header    Host              $http_host;
        proxy_set_header    X-NginX-Proxy     true;
        proxy_set_header    Connection        "";
        proxy_set_header    Upgrade           $http_upgrade;
        proxy_set_header    Connection        "upgrade";
        proxy_read_timeout  86400s;
        proxy_send_timeout  86400s;
        proxy_http_version  1.1;
        proxy_pass          http://yourDomain;
    }
}
```



```
upstream yourDomain {
    server 192.168.1.2:8080 weight=2 max_fails=2 fail_timeout=10s;
}

server {
    client_max_body_size    4G;
    listen                  443;
    server_name             yourDomain;
    ssl on;
    ssl_certificate         /etc/letsencrypt/live/yourDomain.com/fullchain.pem;
    ssl_certificate_key     /etc/letsencrypt/live/yourDomain.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/yourDomain.com/fullchain.pem;

    access_log /var/log/nginx/yourDomain_access.log;
    error_log  /var/log/nginx/yourDomain_error.log;

    location / {
        proxy_set_header    X-Real-IP         $remote_addr;
        proxy_set_header    X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header    X-Forwarded-Proto $scheme;
        proxy_set_header    Host              $http_host;
        proxy_set_header    X-NginX-Proxy     true;
        proxy_set_header    Connection        "";
        proxy_set_header    Upgrade           $http_upgrade;
        proxy_set_header    Connection        "upgrade";
        proxy_read_timeout  86400s;
        proxy_send_timeout  86400s;
        proxy_http_version  1.1;
        proxy_pass          http://yourDomain;
    }
}
```

