---
title: maven 使用
date: 2017-12-29 00:25:16
tags: [maven, java]
---

* <https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html>
* <http://www.oracle.com/webfolder/technetwork/tutorials/obe/java/Maven_SE/Maven.html>
* <http://www.tutorialspoint.com/maven/maven_quick_guide.htm>
* <https://maven.apache.org/guides/getting-started>
* <https://docs.oracle.com/middleware/1212/core/MAVEN/config_maven.htm#MAVEN8853>

<!--more-->

### 创建项目

```
mvn \
archetype:generate \
-DgroupId=com.mycompany.app \
-DartifactId=SDK \
-DarchetypeArtifactId=maven-archetype-quickstart \
-DinteractiveMode=false

cd SDK
```


### 启动程序（方法一）

```
mvn clean package
java -cp target/SDK-1.0-SNAPSHOT.jar com.mycompany.app.App
```


### 启动程序（方法二）

修改文件 pom.xml，添加 `<build>...</build>`

```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.mycompany.app</groupId>
  <artifactId>SDK</artifactId>
  <packaging>jar</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>SDK</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-jar-plugin</artifactId>
        <version>2.4</version>
        <configuration>
          <archive>
            <manifest>
              <mainClass>com.mycompany.app.App</mainClass>
            </manifest>
          </archive>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

`mvn clean package`

`mvn exec:java -Dexec.mainClass="com.mycompany.app.App" -s ~/apache-maven-3.5.2/conf/settings.xml`

或

`java -jar target/SDK-1.0-SNAPSHOT.jar`


### mvn 主要命令

```
mvn clean comlile
mvn clean test
mvn clean package
mvn clean install
```


### maven 配合 IED 使用

我们如果使用 IDE 开发环境，我们可以使用 Maven 生成当前项目相关的 IDE 的描述文件

对于 IntelliJ IEDA 环境，可以用如下命令进行生成：

`mvn idea:idea`

对于 eclipse 环境，可以用如下的命令生成：

`mvn eclipse:eclipse`


### maven 目录结构

`src/main/java` 和 `src/test/java`

这两个目录中的所有 `*.java` 文件会分别在 `compile` 和 `test-comiple` 阶段被编译，编译结果分别放到了 `target/classes` 和 `targe/test-classes` 目录中，但是这两个目录中的其他文件都会被忽略掉。

`src/main/resouces` 和 `src/test/resources`

这两个目录中的文件也会分别被复制到 `target/classes` 和 `target/test-classes` 目录中。

`target/classes`

打包插件默认会把这个目录中的所有内容打入到 jar 包或者 war 包中。
