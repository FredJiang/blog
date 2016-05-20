---
title: gitlab 导数据
date: 2016-05-20 15:42:31
tags: [gitlab, git, bare repository]
---

先说下在导数据的过程中出现的错误信息

> Failed to create repository via gitlab-shell
> 
> Unable to save project

导数据的命令为

`sudo gitlab-rake gitlab:import:repos`

<!--more-->


版本信息

老机器

* 服务器版本 CentOS release 6.7 (Final)
* gitlab 7.14.3
* 安装方式：源码 <https://github.com/gitlabhq/gitlabhq/blob/master/doc/install/installation.md>

新机器

* 服务器版本 Ubuntu 12.04
* gitlab 8.7.5
* 安装方式：Omnibus package <https://about.gitlab.com/downloads/#ubuntu1204>


#### 安装和导数据的步骤

* [安装 gitlab](https://about.gitlab.com/downloads/#ubuntu1204)
* [配置 gitlab](http://docs.gitlab.com/omnibus/)
* 使配置文件生效 `sudo gitlab-ctl reconfigure`
* [开始，重启，关闭](http://docs.gitlab.com/omnibus/maintenance/README.html#starting-and-stopping)
* [导数据](https://gitlab.com/gitlab-org/gitlab-ce/blob/master/doc/raketasks/import.md)，在运行命令 `sudo gitlab-rake gitlab:import:repos` 前，先看下我遇到的如下问题



#### 遇到的问题

[解决方法](https://gitlab.com/gitlab-org/gitlab-ce/issues/2082)

此次问题的原因是：安装方式的不同，导致文件路径不同，导致导数据失败

以 xxx 项目为例，把 xxx 从老机器导到新机器后，在 xxx.git 文件下，有个 hooks 文件

```
lrwxrwxrwx 1 git git   28 May 19 19:00 hooks -> /home/git/gitlab-shell/hooks
```
可以发现，这个文件其实是不存在的

新安装的 gitlab 的相应文件在 `/opt/gitlab/embedded/service/gitlab-shell/hooks/`

这时把 xxx.git 下的 hooks 文件删了就行了 `mv hooks hooks-old`

然后运行  `sudo gitlab-rake gitlab:import:repos`

导数据成功后变成了这样

```
lrwxrwxrwx 1 git git   47 May 19 22:09 hooks -> /opt/gitlab/embedded/service/gitlab-shell/hooks/
lrwxrwxrwx 1 git git   28 May 19 19:00 hooks-old -> /home/git/gitlab-shell/hooks
```

如果有很多项目，可以这样(注意别把正确的 hooks 改了)

```
find . -name 'hooks' -execdir mv {} hooks-old \;
sudo gitlab-rake gitlab:import:repos
```