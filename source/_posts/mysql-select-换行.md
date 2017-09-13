---
title: mysql select 换行
date: 2017-07-31 19:55:31
tags: [mysql]
---



看图说话

默认输出

{% asset_img "default.png" "" %}

<!--more-->


在命令末尾添加 `\G`
{% asset_img "slashG.png" "" %}

使用 `pager`


`pager less -n -i -S` 或 `pager less -S`


上面的命令可以理解为 `pager = less -n -i -S`

所以具体参数可以查看 `man less`

{% asset_img "page1.png" "" %}

使用键盘上的左右方向键，移动 table

{% asset_img "page2.png" "" %}

关闭 pager `nopager`


另外也可以使用 view 来保存你感兴趣的字段。我这主要想把 avatar 头像去掉，因为头像的 url 很长，我也不感兴趣。

当然最好是在测试环境下使用 view 这种方式，不过要在正式环境使用的话，我也不拦着

```
CREATE VIEW vw_yourTable
as  
SELECT column1, column2, column3
FROM yourTable;

SELECT * FROM vw_yourTable
```

参考

* <https://serverfault.com/questions/555214/mysql-output-without-truncating>
* <https://dev.mysql.com/doc/refman/5.7/en/mysql-commands.html>