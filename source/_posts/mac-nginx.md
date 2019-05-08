---
title: mac nginx
date: 2019-03-31 00:01:30
tags: [mac, nginx]
---

```sh
brew services list

sudo brew services stop  nginx

sudo brew services start nginx

ls /Library/LaunchDaemons/ | grep nginx
```

<!--more-->

```
==> nginx
Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

To have launchd start nginx now and restart at login:
  brew services start nginx
Or, if you don't want/need a background service you can just run:
  nginx
==> unbound
To have launchd start unbound now and restart at startup:
  sudo brew services start unbound
```
