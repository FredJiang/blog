---
title: hadoop mapreduce
date: 2018-07-21 22:51:30
tags: [hadoop, mapreduce, db]
---

<https://www.tutorialspoint.com/hadoop/hadoop_mapreduce.htm>

<!--more-->

准备文件

```
cd

$HADOOP_HOME/bin/hadoop fs -ls /

$HADOOP_HOME/bin/hadoop fs -mkdir input_dir

$HADOOP_HOME/bin/hadoop fs -put /home/hadoop/sample.txt input_dir

$HADOOP_HOME/bin/hadoop fs -ls input_dir/
```

直接使用 java 命令

```
rm -rf output_dir && \
javac -classpath /home/hadoop/.m2/repository/org/apache/hadoop/hadoop-core/1.2.1/hadoop-core-1.2.1.jar -d units ProcessUnits.java && \
jar -cvf units.jar -C units/ . && \
$HADOOP_HOME/bin/hadoop jar units.jar hadoop.ProcessUnits input_dir output_dir
```

使用 maven

pom.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.fred.app</groupId>
  <artifactId>units</artifactId>
  <packaging>jar</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>units</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <!-- https://mvnrepository.com/artifact/org.apache.hadoop/hadoop-core -->
    <dependency>
      <groupId>org.apache.hadoop</groupId>
      <artifactId>hadoop-core</artifactId>
      <version>1.2.1</version>
    </dependency>
    <!-- logger -->
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
      <version>1.7.25</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.3</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-core</artifactId>
      <version>1.2.3</version>
    </dependency>
  </dependencies>
</project>
```

使用 log4j，先修改日志格式

`vim $HADOOP_HOME/etc/hadoop/log4j.properties`

```
#log4j.appender.console.layout.ConversionPattern=%d{ISO8601}·%p·%c{2}:·%m%n
log4j.appender.console.layout.ConversionPattern=%d{ISO8601}·%p·[%thread]·%l·:·%m%n
```

编译运行

```
rm -rf ~/output_dir && \
mvn clean compile package && \
$HADOOP_HOME/bin/hadoop jar ~/units/target/units-1.0-SNAPSHOT.jar com.fred.app.ProcessUnits ~/input_dir ~/output_dir
```


