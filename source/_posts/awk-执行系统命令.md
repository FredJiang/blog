---
title: awk 执行系统命令
date: 2017-06-22 11:54:46
tags: [awk, system, getline]
---



```
echo "1\n2\n" | awk -v nginxConfFile="/path/xxx.conf" '{ "dirname "  nginxConfFile | getline commandResult ; printf("%s\n", commandResult );}'
echo "1\n2\n" | awk -v nginxConfFile="/path/xxx.conf" '{ "basename " nginxConfFile | getline commandResult ; printf("%s\n", commandResult );}'

echo "1\n2\n" | awk -v nginxConfFile="/path/xxx.conf" '{ $commandResult = system("dirname "  nginxConfFile) ; printf("%s\n", commandResult );}'
echo "1\n2\n" | awk -v nginxConfFile="/path/xxx.conf" '{ $commandResult = system("basename " nginxConfFile) ; printf("%s\n", commandResult );}'

echo "1\n2\n" | awk -v nginxConfFile="/path/xxx.conf" '{ commandResult = system("dirname "  nginxConfFile) ; printf("%s\n", commandResult );}'
echo "1\n2\n" | awk -v nginxConfFile="/path/xxx.conf" '{ commandResult = system("basename " nginxConfFile) ; printf("%s\n", commandResult );}'
```