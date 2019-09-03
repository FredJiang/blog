---
title: maven version
date: 2019-08-26 21:38:21
tags: [maven, mvn, version]
---

<https://www.mojohaus.org/versions-maven-plugin/index.html>

<!--more-->

```shell
mvn dependency:tree -Dverbose
```

dependency

```shell
mvn versions:display-dependency-updates
mvn versions:use-latest-releases
```

plugin

```shell
mvn versions:display-plugin-updates
```

<https://maven.apache.org/pom.html#Prerequisites>

```xml
<project>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-enforcer-plugin</artifactId>
                <version>3.0.0-M2</version>
                <executions>
                    <execution>
                        <id>enforce-maven</id>
                        <goals>
                            <goal>enforce</goal>
                        </goals>
                        <configuration>
                            <rules>
                                <requireMavenVersion>
                                    <version>3.6.1</version>
                                </requireMavenVersion>
                            </rules>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```
