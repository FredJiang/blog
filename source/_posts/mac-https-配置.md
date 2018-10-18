---
title: mac https 配置
date: 2018-10-10 11:26:20
tags: [mac, certbot, https, letsencrypt, nginx, ssl]
---

<https://certbot.eff.org/lets-encrypt/osx-nginx>

<!--more-->

```bash
brew install certbot

sudo certbot --nginx certonly

sudo certbot renew --dry-run

certbot renew

sudo            certbot certonly --standalone --preferred-challenges http -d example.com
sudo ./letsencrypt-auto certonly --standalone --email 270130108@qq.com -d example.com
```
