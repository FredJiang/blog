---
title: mac php
date: 2019-05-29 19:45:20
tags: [php]
---

<https://stillat.com/blog/2014/04/02/how-does-php-work-with-the-web-server-and-browser>

<!--more-->

```sh
httpd -v

sudo apachectl start
sudo apachectl stop
sudo apachectl restart

# http://localhost:80
ls /Library/WebServer/Documents

ls /etc/apache2/
```

test.php

```php
<?php
   echo "Hello PHP!!!!!";
?>
```

```sh
php test.php
```
