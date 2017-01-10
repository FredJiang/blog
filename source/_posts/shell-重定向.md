---
title: shell 重定向
date: 2016-12-30 00:07:28
tags: [shell, redirect]
---



You can redirect stderr exclusively to a file and stdout to another file as follows: 


`cmd 2>stderr.txt 1>stdout.txt`

`>` is equivalent to `1>` and similarly it applies for `>>` (equivalent to `1>>`).

<!--more-->

It is also possible to redirect stderr and stdout to a single file by converting stderr to stdout using this preferred method:

```
cmd 2>&1 output.txt
# or
cmd &> output.txt
```

If you don't want the output terminal burdened with the stderr details then you should redirect the stderr output to /dev/null, which removes it completely.

`cmd 2>/dev/null`

`/dev/null` is a special device file where any data received by the file is discard. The null device is often known as a black hole as all the data that goes into it is lost forever.


In the following code, the stdin data is received by the tee command. It writes a copy of stdout to the out.txt and sends another copy stdin for the next command.

`cat a* | tee out.txt | cat -n`

The tee command can read from stdin only.


By default, the tee command overwrites the file, but it can be used with appended options by providing the -a option, for example, 

`cat a* | tee -a out.txt | cat -n`

By using redirection, we can read data from a file as  stdin as follows:

`cmd < file`
