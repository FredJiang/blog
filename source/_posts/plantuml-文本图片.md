---
title: plantuml 文本图片
date: 2017-05-12 18:52:58
tags: [uml, ASCII, ditaa]
---

在写博客时，需要一些图，由于图片相对于文字体积较大，所以想用文本来表示图片

平常画图用的是 uml



* [emacs 配置 PlantUML](../../../../2016/08/04/emacs-配置-PlantUML/)
* [UML 部署图](../../../../2016/08/06/UML-部署图/)
* [atom 编辑 uml](../../../../2016/12/21/atom-编辑-uml/)

<!--more-->

另外在 emacs 下有个 `Artist Mode`

* <https://www.emacswiki.org/emacs/ArtistMode>
* <https://www.youtube.com/watch?v=cIuX87Xo8Fc>

由于 `Artist Mode` 用的不是很 6

就选择了如下方式

* <http://plantuml.com/ascii-art>
* <http://plantuml.com/command-line>


具体使用方法


uml 文件如下

```
@startuml
participant Bob
actor Alice

Bob -> Alice : hello
Alice -> Bob : Is it ok?
@enduml
```

对应图片

{% asset_img "AsciiArt.png" "" %}

运行如下命令

java -jar ~/plantuml.jar -txt AsciiArt.puml


得到文本图片

```
                      ,-.  
                      `-'  
                      /|\  
     ,---.             |   
     |Bob|            / \  
     `-+-'           Alice 
       |    hello      |   
       |-------------->|   
       |               |   
       |  Is it ok?    |   
       |<--------------|   
     ,-+-.           Alice 
     |Bob|            ,-.  
     `---'            `-'  
                      /|\  
                       |   
                      / \  
```

另外还可以配合 `ditaa` 生成真的图片

<http://ditaa.sourceforge.net/>



另外在 mac 下，可以试试 Monodraw 这个软件。