---
title: shell - 打印
date: 2016-12-19 21:12:06
tags: [shell, linux]
---


* echo 默认会添加换行

`echo "Welcome to Bash"`

<!--more-->

* echo 加 -n 不换行

`echo -n "Welcome to Bash"`

* 以下三句效果一样

```
echo "Welcome to Bash"
echo  Welcome to Bash
echo 'Welcome to Bash'
```

* printf

`printf  "%-5s %-10s %-4s\n" No Name  Mark`

%s、%c、%d 和 %f 用于字符串替换，`-` 表示左对齐

* 打印不同颜色的文字

[ANSI escape code](https://en.wikipedia.org/wiki/ANSI_escape_code)

[Sequence elements](https://en.wikipedia.org/wiki/ANSI_escape_code#Sequence_elements)

[man ascii](http://man7.org/linux/man-pages/man7/ascii.7.html)

In computing, ANSI escape codes (or escape sequences) are a method using in-band signaling to control the formatting, color, and other output options on video text terminals. To encode this formatting information, certain sequences of bytes are embedded into the text, which the terminal looks for and interprets as commands, not as character codes.

```
echo -e "\033[1;31m This is red text \033[0m"
printf "\033[1;31m This is red text \033[0m"

RED='\033[1;31m'
NoColor='\033[0m'
echo -e "${RED}this is red text${NoColor}"
```
Producing a colored output on the terminal is very interesting and is achieved by using escape sequences.

Colors are represented by color codes, some examples being, reset = 0, black = 30, red = 31, green = 32, yellow = 33, blue = 34, magenta = 35, cyan = 36, and white = 37.

Here, `\033[1;31m` is the escape string that sets the color to red and `\033[0m` resets the color back. Replace 31 with the required color code.

For a colored background, reset = 0, black = 40, red = 41, green = 42, yellow = 43, blue = 44, magenta = 45, cyan = 46, and white=47, are the color codes that are commonly used.

* 打印环境变量

`cat /proc/$PID/environ | tr '\0' '\n'`

* 变量

In Bash, the value for every variable is string, regardless of whether we assign variables with quotes or without quotes.

var=value

`var` is the name of a variable and `value` is the value to be assigned. If value does not contain any space character (such as space), it need not be enclosed in quotes, Otherwise it is to be enclosed in single or double quotes.

Note that `var = value` and `var=value` are different. The later one is the assignment operation, whereas the earlier one is an equality operation.

* 打印变量

```
echo $var
echo ${var}
```

* 打印变量长度

```
echo ${#var}
```
