title: markdown 生成目录
date: 2015-03-12 21:37:39
tags: [markdown]
---

### 需求
用 markdown 写完接口文档后，想根据接口文档自动生成一个目录





### 代码分析

markdown 代码

	[接口1](#interface1)
	### [/接口1](id:interface1)


装换成对应的 html 代码

	<a href="#interface1">接口1</a></p>
	<h3><span id="interface1">/接口1</span></h3>

 
 
在写 markdown 的时候，

我只想写（修改接口文档时太麻烦了）

	### [/接口1](id:interface1)

不想写

	[接口1](#interface1)

所以这里需要做的是

读取原 markdown 文件，根据

	### [/接口1](id:interface1)

得到

	[接口1](#interface1)

装换用的 python 代码

	#!/usr/bin/python
	#coding:utf-8
	
	import sys
	import re
	
	markdownFileName = sys.argv[1]
	
	for line in open(markdownFileName):
	    match = re.search(r"\[([\s\S]*)\]\(id:([\s\S]*)\)", line)
	    if match:
	        print(re.sub("id:", "#", match.group(0)))
	        print("")

使用方法

```
python produceMDCategory.py test.md
```
输出

	[/接口1](#interface1)


现在只要把输出的内容，拷贝到 test.md 中即可