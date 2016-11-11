---
title: UML 部署图
date: 2016-08-06 23:58:27
tags: [UML, deploy]
---

最近整理服务器，需要画出服务器的 [UML](http://www.omg.org/spec/UML/) 部署图，这里用到了 [plantuml](http://plantuml.com/) 的 Component Diagram 和 Deployment Diagram。

<!--more-->

#### [Component Diagram](http://plantuml.com/component.html)

##### Components 声明

* 用括号括住，如：[First component]
* 用关键字 component，如：component Second

憋说话，看图

{% asset_img "0.png" "" %}


##### Components 分组

* package
* node
* folder
* frame
* cloud
* database

憋说话，再看图

{% asset_img "1.png" "" %}


[注意的点](http://www.ibm.com/developerworks/rational/library/dec04/bell/)

In UML 2, components are considered autonomous, encapsulated units within a system or subsystem that provide one or more interfaces. Although the UML 2 specification does not strictly state it, components are larger design units that represent things that will typically be implemented using replaceable" modules. But, unlike UML 1.x, components are now strictly logical, design-time constructs. The idea is that you can easily reuse and/or substitute a different component implementation in your designs because a component encapsulates behavior and implements specified interfaces. [Note: The physical items that UML1.x called components are now called "artifacts" in UML 2. An artifact is a physical unit, such as a file, executable, script, database, etc. Only artifacts live on physical nodes; classes and components do not have "location." However, an artifact may manifest components and other classifiers (i.e., classes). A single component could be manifested by multiple artifacts, which could be on the same or different nodes, so a single component could indirectly be implemented on multiple nodes.]


#### [Deployment Diagram](http://plantuml.com/deployment.html)

直接看 <http://plantuml.com/deployment.html> 吧


#### 怎么画

<http://www.tutorialspoint.com/uml/uml_deployment_diagram.htm>


#### node

A node is computational resource upon which artifacts may be deployed for execution. Node is a subclass of Class. It is associated with a Deployment of an Artifact. It is also associated with a set of Elements that are deployed on it.


#### artifact

An artifact is a classifier that represents some physical entity, a piece of information that is used or is produced by a software development process, or by deployment and operation of a system. Artifact is a source of a deployment to a node. A particular instance (or "copy") of an artifact is deployed to a node instance.

Some real life examples of UML artifacts are:

* text document
* source file
* script
* binary executable file
* archive file
* database table