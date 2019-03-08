---
title: mvn spring 配置文件
date: 2018-11-21 01:43:09
tags: [mvn, maven, spring, profile]
---

maven 配置文件

profiles/profile-dev.properties

```
maven.profile.mysql.host=127.0.0.1
maven.profile.mysql.port=3306
maven.profile.mysql.username=username
maven.profile.mysql.password=password
maven.profile.mysql.dbname=dbname
```

<!--more-->

maven 使用配置文件

pom.xml

```xml
    <profiles>
        <profile>
            <id>dev</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <build>
                <filters>
                    <filter>profiles/profile-dev.properties</filter>
                </filters>
            </build>
        </profile>
    </profiles>
```

war 配置文件（mvn package 后，会到 war 中）

src/main/resources/mysql.properties

```
maven.profile.mysql.host=${maven.profile.mysql.host}
maven.profile.mysql.port=${maven.profile.mysql.port}
maven.profile.mysql.username=${maven.profile.mysql.username}
maven.profile.mysql.password=${maven.profile.mysql.password}
maven.profile.mysql.dbname=${maven.profile.mysql.dbname}
```

profiles/profile-dev.properties 替换 src/main/resources/mysql.properties 中的占位符（filtering 为 true）

pom.xml

```xml
    <build>
        <finalName>shirodemo</finalName>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
            </resource>
        </resources>
    </build>
```

容器加载 spring 的配置文件

src/main/webapp/WEB-INF/web.xml

```xml
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/applicationContext*.xml</param-value>
    </context-param>
```

spring 加载 war 中的配置文件

src/main/webapp/WEB-INF/applicationContext.xml

```xml
    <bean id="configProperties"
          class="org.springframework.beans.factory.config.PropertiesFactoryBean">
        <property name="locations">
            <list>
                <value>classpath:mysql.properties</value>
                <value>classpath:shiro-config.properties</value>
            </list>
        </property>
        <property name="fileEncoding" value="utf-8"/>
    </bean>
    <bean id="propertyConfigurer"
          class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
        <property name="order" value="1"/>
        <property name="ignoreUnresolvablePlaceholders" value="true"/>
        <property name="properties" ref="configProperties"/>
    </bean>
```

spring 使用 war 中的配置文件

src/main/webapp/WEB-INF/applicationContext-mybatis.xml

```xml
    <bean id="opDataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url"
                  value="jdbc:mysql://${maven.profile.mysql.host}:${maven.profile.mysql.port}/${maven.profile.mysql.dbname}"/>
        <property name="username" value="${maven.profile.mysql.username}"/>
        <property name="password" value="${maven.profile.mysql.password}"/>
    </bean>
```



