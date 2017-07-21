---
title: nmon 使用
date: 2016-11-15 11:36:58
tags: [nmon, linux, plot, benchmark, test]
---

### 安装

`apt-get install nmon`

<!--more-->

### 使用


#### 交互方式

终端输入 `nmon`, 根据提示按下 m, 显示内存信息, 再按下 c 显示 CPU 信息. 再按下 m, 关闭内存信息. 帮助信息按 h. q 退出. 

#### 非交互方式

`nmon -f -t -s 30 -c 180`

* -f: 按标准格式输出文件: <hostname>_YYMMDD_HHMM.nmon
* -t: 输出中包括占用率较高的进程
* -s: 每 30 秒进行一次数据采集
* -c: 一共采集 180 次

查看结果

`sort fred-UBUNTU_161115_1116.nmon > fred-UBUNTU_161115_1116.csv`

可以直接查看 csv 文件.

或者用以下工具

#### [Analyze nmon data](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/Power+Systems/page/nmon_analyser)

* 下载 [Analyze nmon data](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/Power+Systems/page/nmon_analyser), 我这里用的是 [nmon_analyser_v51_2.zip](https://www.ibm.com/developerworks/community/wikis/form/anonymous/api/wiki/61ad9cf2-c6a3-4d2c-b779-61ff0266d32a/page/b7fc61a1-eef9-4756-8028-6e687997f176/attachment/d32a74ae-0ab5-4abc-8e61-567b5f41c5e5/media/nmon_analyser_v51_2.zip) 版本
* 解压 nmon_analyser_v51_2.zip
* 打开 nmon analyser v51_2.xlsm
* 如果 excel 提示是否用宏, 选择使用宏
* 点击 Analyze nmon data
* 选择 csv 文件 fred-UBUNTU_161115_1116.csv
* 静静地等待结果...
* 查看结果文件 fred-UBUNTU_161115_1116.nmon.xlsx 中的各种数据
* 如果以上步骤没有得到图表的话, 可以换个 excel 版本试试(我这 2011 版本的 excel 用不了,我更新了 2016 版本的 excel 才好的)
* 祝你好运!

#### [nmonchart](http://nmon.sourceforge.net/pmwiki.php?n=Site.Nmonchart)

```
mkdir nmonchart30
cd nmonchart30
wget "http://jaist.dl.sourceforge.net/project/nmon/nmonchart30.tar"
tar xvf nmonchart30.tar
sudo apt-get install ksh
./nmonchart ../fred-UBUNTU_161115_1116.nmon ../fred-UBUNTU_161115_1116.html

```


参考

* <http://nmon.sourceforge.net/pmwiki.php>