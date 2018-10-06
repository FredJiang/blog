---
title: hadoop 安装（一）
date: 2018-07-20 22:46:12
tags: [db, hadoop]
---

### Local/Standalone Mode

<https://www.tutorialspoint.com/hadoop/hadoop_enviornment_setup.htm>

添加用户

```
sudo useradd -m hadoop
sudo passwd hadoop
su hadoop
ssh-keygen -t rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 0600 ~/.ssh/authorized_keys
```

<!--more-->

检查 java 版本，没有的话，需要安装

`java -version`


下载 hadoop

```
# wget                    "http://apache.claz.org/hadoop/common/hadoop-3.1.0/hadoop-3.1.0.tar.gz"
wget "https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-3.1.0/hadoop-3.1.0.tar.gz"
tar xzf hadoop-3.1.0.tar.gz
```


设置环境变量

```
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin
export HADOOP_HOME=/home/hadoop/hadoop-3.1.0
```

`source ~/.bashrc`

测试

```
mkdir input
cp $HADOOP_HOME/*.txt input
ls -l input

# 在 Local/Standalone Mode 下执行
$HADOOP_HOME/bin/hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.1.0.jar wordcount input output
```

