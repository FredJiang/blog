---
title: 'nvm Error: EACCES: permission denied, scandir'
date: 2016-06-24 10:00:55
tags: [node.js, n, nvm]
---

由于 node 版本更新的比较快，如果想要不断试用新的版本，一个版本控制器就是必不可少的了。之前一直用的 [n](https://github.com/tj/n)，但每次切换版本时，global package 总会有点问题，因此想试用一下 [nvm](https://github.com/creationix/nvm)

[n 和 nvm 对比](/2016/06/23/n-和-nvm-对比/)

以下是使用 nvm 时遇到的一个问题

> Error: EACCES: permission denied, scandir

<!--more-->

具体环境：在服务器上，有个 pm2runner 的用户，pm2runner 这个用户就是专门用来跑 node 程序的

具体出错过程如下

首先根据文档，以用户 pm2runner 的身份先安装好 nvm，然后运行下列命令

```
[fred@iZ28zknjosgZ ~]$ pwd
/home/fred
[fred@iZ28zknjosgZ ~]$ su pm2runner
Password: 
Error: EACCES: permission denied, scandir '/home/fred'
    at Error (native)

Error: EACCES: permission denied, open 'npm-debug.log.2664767795'
    at Error (native)

nvm is not compatible with the npm config "prefix" option: currently set to ""
Run `nvm use --delete-prefix v6.2.2 --silent` to unset it.
[pm2runner@iZ28zknjosgZ fred]$ node -v
bash: node: command not found
[pm2runner@iZ28zknjosgZ fred]$ pwd
/home/fred
[pm2runner@iZ28zknjosgZ fred]$ ls
ls: cannot open directory .: Permission denied
[pm2runner@iZ28zknjosgZ fred]$
```

进一步测试

```
[fred@iZ28zknjosgZ xxx]$ pwd
/home/fred/xxx
[fred@iZ28zknjosgZ xxx]$ su pm2runner
Password: 
Error: EACCES: permission denied, scandir '/home/fred/xxx'
    at Error (native)

Error: EACCES: permission denied, open 'npm-debug.log.1141086419'
    at Error (native)

nvm is not compatible with the npm config "prefix" option: currently set to ""
Run `nvm use --delete-prefix v6.2.2 --silent` to unset it.
[pm2runner@iZ28zknjosgZ xxx]$
```

根据上面的提示，查看文件 `/home/pm2runner/.bashrc`

```
# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi

export NVM_DIR="/home/pm2runner/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```


发现每次都会运行 `nvm.sh`，因此猜测这个脚本里面用到了 `pwd`

查看文件 `/home/pm2runner/.nvm/nvm.sh`

```
# Traverse up in directory tree to find containing folder
nvm_find_up() {
  local path
  path="$PWD"
  while [ "$path" != "" ] && [ ! -f "$path/$1" ]; do
    path=${path%/*}
  done
  nvm_echo "$path"
}
```

果然有一个 `PWD`(不确定是不是这个 PWD 引起的问题，但是顺着这个思路，能解决这个问题)

最后修改

```
# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

cd

export NVM_DIR="/home/pm2runner/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```

再次切换用户测试

```
[fred@iZ28zknjosgZ xxx]$ pwd
/home/fred/xxx
[fred@iZ28zknjosgZ xxx]$ su pm2runner
Password: 
[pm2runner@iZ28zknjosgZ ~]$ node -v
v6.2.2
[pm2runner@iZ28zknjosgZ ~]$
```