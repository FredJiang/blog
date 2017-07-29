---
title: escape character
date: 2017-07-06 17:42:53
tags: [escape, grep, vim, shell]
---



```
echo -e "\033[32m green \033[0m white \033[31m red \033[0m white"

echo -e "\033[32m green \033[0m white \033[31m red \033[0m white" > color_escape

echo 'no escape code' >> color_escape

vim color_escape

^[[32m green ^[[0m white ^[[31m red ^[[0m white

grep '\e\[' color_escape
```

<!--more-->

{% asset_img "cat.png" "" %}

{% asset_img "vim.png" "" %}

注意第一行的 `^[[` 和 第三行的 `^[[` 颜色是不一样的

{% asset_img "grep.png" "" %}



可参考 [shell 打印](../../../../2016/12/19/shell-打印/)




terminal 


```
➜  ~ cat
^[[1;9A^[[1;9B^[[1;9D^[[1;9C     ^[[A^[[B^[[D^[[C
```

alt up 
alt down