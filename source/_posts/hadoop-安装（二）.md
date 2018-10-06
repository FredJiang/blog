---
title: hadoop 安装（二）
date: 2018-07-20 22:46:21
tags: [db, hadoop, mapReduce]
---

### Pseudo Distributed Mode

<https://www.tutorialspoint.com/hadoop/hadoop_enviornment_setup.htm>

[hadoop 安装（一）](../../../../2018/07/20/hadoop-安装（一）/)

<!--more-->

设置环境变量

```
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin
export HADOOP_HOME=/home/hadoop/hadoop-3.1.0
export HADOOP_MAPRED_HOME=$HADOOP_HOME 
export HADOOP_COMMON_HOME=$HADOOP_HOME 
export HADOOP_HDFS_HOME=$HADOOP_HOME 
export YARN_HOME=$HADOOP_HOME 
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native 
export PATH=$PATH:$HADOOP_HOME/sbin:$HADOOP_HOME/bin 
export HADOOP_INSTALL=$HADOOP_HOME 
```

在配置文件 `$HADOOP_HOME/etc/hadoop/hadoop-env.sh` 中添加

`export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64`

在配置文件 `$HADOOP_HOME/etc/hadoop/core-site.xml` 的 `<configuration></configuration>` 中添加

```
<configuration>

   <property>
      <name>fs.default.name</name>
      <value>hdfs://localhost:9000</value> 
   </property>
 
</configuration>
```

在配置文件 `$HADOOP_HOME/etc/hadoop/hdfs-site.xml` 的 `<configuration></configuration>` 中添加

```
<configuration>

   <property>
      <name>dfs.replication</name>
      <value>1</value>
   </property>
    
   <property>
      <name>dfs.name.dir</name>
      <value>file:///home/hadoop/hadoopinfra/hdfs/namenode</value>
   </property>
    
   <property>
      <name>dfs.data.dir</name> 
      <value>file:///home/hadoop/hadoopinfra/hdfs/datanode</value> 
   </property>
       
</configuration>
```


在配置文件 `$HADOOP_HOME/etc/hadoop/yarn-site.xml` 的 `<configuration></configuration>` 中添加

```
<configuration>
 
   <property>
      <name>yarn.nodemanager.aux-services</name>
      <value>mapreduce_shuffle</value> 
   </property>
  
</configuration>
```


在配置文件 `$HADOOP_HOME/etc/hadoop/mapred-site.xml` 的 `<configuration></configuration>` 中添加

```
<configuration>
 
   <property> 
      <name>mapreduce.framework.name</name>
      <value>yarn</value>
   </property>
   
</configuration>
```


测试

```
$HADOOP_HOME/bin/hdfs namenode -format

$HADOOP_HOME/sbin/start-dfs.sh

$HADOOP_HOME/sbin/start-yarn.sh

curl -v "http://localhost:50070/"

curl -v "http://localhost:8088/"

curl -v "http://localhost:8042/"
```


