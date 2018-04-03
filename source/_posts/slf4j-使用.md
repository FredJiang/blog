---
title: slf4j 使用
date: 2018-03-10 00:27:00
tags: [java, maven, slf4j, log]
---

* <https://www.slf4j.org/manual.html>
* <https://www.jianshu.com/p/696444e1a352>

<!--more-->

SLF4J 即简单日志门面（Simple Logging Facade for Java）

配置 SLF4J 是非常简单的一件事，只要将与你打算使用的日志系统对应的 jar 包加入到项目中，SLF4J 就会自动选择使用你加入的日志系统。

日志系统绑定原理：

在应用中，通过 LoggerFactory 类的静态 getLogger() 获取 Logger。通过查看该类的代码可以看出，最终是通过 StaticLoggerBinder.SINGLETON.getLoggerFactory() 方法获取 LoggerFactory 然后，在通过该具体的 LoggerFactory 来获取 logger 的。类 org.slf4j.impl.StaticLoggerBinder 并不在 slf4j-api-1.5.2.jar 包中，仔细查看每个与具体日志系统对应的 jar 包，就会发现，相应的 jar 包都有一个 org.slf4j.impl.StaticLoggerBinder 的实现，不同的实现返回与该日志系统对应的 LoggerFactory，因此就实现了所谓的静态绑定，达到只要选取不同 jar 包就能简单灵活配置的目的。

在 pom.xml 中添加

```xml
<dependencies>
  <dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>${slf4j-version}</version>
  </dependency>
  <dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>${logback-version}</version>
  </dependency>
  <dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-core</artifactId>
    <version>${logback-version}</version>
  </dependency>
</dependencies>
<properties>
  <slf4j-version>1.7.25</slf4j-version>
  <logback-version>1.2.3</logback-version>
</properties>
```


在 java 代码中使用

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloWorld {
  private static final Logger logger = LoggerFactory.getLogger(HelloWorld.class);
  public static void main(String[] args) {
    logger.info("Hello World");
  }
}
```

如果不添加

```xml
<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>${logback-version}</version>
</dependency>
```


会报警告

```text
log4j:WARN No appenders could be found for logger
log4j:WARN Please initialize the log4j system properly.
log4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.
```



* <https://logback.qos.ch/manual/configuration.html>
* <https://logback.qos.ch/manual/layouts.html>

在 maven 中，配置文件为 `src/main/resources/logback.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <property name="LOG_HOME" value="${log_home}"/>
  <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
      <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{32} %L - %msg%n</pattern>
    </encoder>
  </appender>
  <appender name="fileAppender" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <FileNamePattern>${LOG_HOME}/op.%d{yyyy-MM-dd}.log</FileNamePattern>
      <MaxHistory>100</MaxHistory>
    </rollingPolicy>
    <encoder>
      <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{32} %L - %msg%n</pattern>
    </encoder>
  </appender>
  <root>
    <level value="INFO"/>
    <appender-ref ref="STDOUT"/>
  </root>
</configuration>
```

