---
title: HBase 安装
date: 2016-09-07 19:35:32
tags: [db, HBase, hadoop]
---

参考

* <http://www.tutorialspoint.com/hbase/hbase_installation.htm>


<!--more-->


#### 创建 hadoop 用户

```
sudo useradd hadoop
sudo su hadoop
cd
ssh-keygen -t rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 0600 ~/.ssh/authorized_keys
```

测试 ssh

```
ssh localhost
exit
```


#### 安装 java

检查是否安装了 java

`java -version`

有必要的话，删掉老的 openjdk

```
sudo yum remove java*
```

安装 java

<http://www.oracle.com/technetwork/java/javase/downloads/index.html>

```
cd
wget http://download.oracle.com/otn-pub/java/jdk/8u101-b13/jdk-8u101-linux-x64.tar.gz?AuthParam=1473134495_a1df02ce89e8024c26dc4051f002e3a4
mv jdk-8u101-linux-x64.tar.gz?AuthParam=1473134495_a1df02ce89e8024c26dc4051f002e3a4 jdk-8u101-linux-x64.tar.gz
tar zxf jdk-8u101-linux-x64.tar.gz
sudo mv jdk1.8.0_101/ /usr/local/
```

编辑 ~/.bashrc


```
export JAVA_HOME=/usr/local/jdk1.8.0_101
export PATH=$PATH:$JAVA_HOME/bin:
```

`source ~/.bashrc`

ubuntu 下


`update-alternatives: --install needs <link> <name> <path> <priority>`


```
sudo update-alternatives --install /usr/bin/java java /usr/local/jdk1.8.0_101/bin/java 2

sudo update-alternatives --install /usr/bin/javac javac /usr/local/jdk1.8.0_101/bin/javac 2

sudo update-alternatives --install /usr/bin/jar jar /usr/local/jdk1.8.0_101/bin/jar 2

sudo update-alternatives --set java /usr/local/jdk1.8.0_101/bin/java

sudo update-alternatives --set javac /usr/local/jdk1.8.0_101/bin/javac

sudo update-alternatives --set jar /usr/local/jdk1.8.0_101/bin/jar
```

#### 安装 hadoop

下载 <http://hadoop.apache.org/releases.html>

```
sudo su root
cd /usr/local
wget http://mirrors.cnnic.cn/apache/hadoop/common/hadoop-2.7.3/hadoop-2.7.3.tar.gz
tar xzf hadoop-2.7.3.tar.gz
mv hadoop-2.7.3 hadoop
exit
```

编辑 ~/.bashrc

```
export HADOOP_HOME=/usr/local/hadoop
export HADOOP_MAPRED_HOME=$HADOOP_HOME
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export YARN_HOME=$HADOOP_HOME
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
export PATH=$PATH:$HADOOP_HOME/sbin:$HADOOP_HOME/bin
export HADOOP_INSTALL=$HADOOP_HOME
```

`source ~/.bashrc`

具体的配置过程，参看 <http://www.tutorialspoint.com/hbase/hbase_installation.htm>


#### 安装 HBase

下载 <https://www.apache.org/dist/hbase/>

```
cd
wget https://www.apache.org/dist/hbase/stable/hbase-1.2.2-bin.tar.gz
tar -zxvf hbase-1.2.2-bin.tar.gz
sudo su root
mv hbase-1.2.2 /usr/local/hbase
cd /usr/local/hbase/conf
```

具体的配置过程，参看 <http://www.tutorialspoint.com/hbase/hbase_installation.htm>