---
title: emacs 配置 PlantUML
date: 2016-08-04 16:22:13
tags: [emacs, PlantUML, uml]
---


* 机器：MacBook Air
* Emacs 版本：Version 24.5 (9.0)

<!--more-->

* 下载 jar 包：从 <http://plantuml.com/download.html> 下载 PlantUML compiled Jar
* 安装 graphviz：`brew install graphviz` 
* 配置 emacs：用 <http://plantuml.com/emacs.html> 中的 Org-Babel 中的 blocks of plantuml code <http://eschulte.github.io/babel-dev/DONE-integrate-plantuml-support.html>

配置如下

```
;; active Org-babel languages
(org-babel-do-load-languages
 'org-babel-load-languages
 '(;; other Babel languages
   (plantuml . t)))
(setq org-plantuml-jar-path
      (expand-file-name "~/plantuml.jar"))
```


测试：

创建文件 test.plantuml

```
#+begin_src plantuml :file tryout.png
  Alice -> Bob: synchronous call
  Alice ->> Bob: asynchronous call
#+end_src
```

目录结构如下

```
plantumlTest
└── test.plantuml
```

`org-mode` 激活 org mode

`C-c C-e h h` 导出文件 org-html-export-to-html

结果如下

```
plantumlTest
├── test.html
├── test.plantuml
└── tryout.png
```

或者把光标定位到

```
#+BEGIN_SRC plantuml :file test.png
xxx
#+END_SRC
```
然后 `C-c C-c` 执行这段 SRC 生成文件 test.png


更进一步可使用 [puml-mode](https://github.com/skuro/puml-mode)

puml-mode 可能会报语法错误，参看 demo 里面，是没有如下代码的

```
#+BEGIN_SRC plantuml :file
#+END_SRC
```

参考：<http://archive.3zso.com/archives/plantuml-quickstart.html>