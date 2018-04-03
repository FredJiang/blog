---
title: java uml 类图
date: 2018-02-06 08:48:37
tags: [java, uml, maven]
---

参考

<https://maven.apache.org/plugins/maven-javadoc-plugin/examples/alternate-doclet.html>

<!--more-->

首先安装 `graphviz`

```
brew install graphviz
sudo apt-get install -y graphviz
```


用 `dot -h` 查看 graphviz 安装成功了没有

在 `pom.xml` 中添加 plugin

```
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-javadoc-plugin</artifactId>
  <version>3.0.0</version>
  <configuration>
    <doclet>org.umlgraph.doclet.UmlGraphDoc</doclet>
    <!-- <docletPath>/path/to/UmlGraph.jar</docletPath> -->
    <docletArtifact>
      <groupId>org.umlgraph</groupId>
      <artifactId>doclet</artifactId>
      <version>5.1</version>
    </docletArtifact>
    <additionalparam>-views</additionalparam>
    <useStandardDocletOptions>true</useStandardDocletOptions>
  </configuration>
</plugin>
```

运行命令 `mvn javadoc:javadoc`

查看所有图片

`find ./target/site/apidocs/com/ -type f -name '*png' -exec ~/.iterm2/imgcat {} +`

