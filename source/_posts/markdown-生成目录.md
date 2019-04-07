---
title: markdown 生成目录
date: 2015-03-12 21:37:39
tags: [markdown]
---

### 需求

用 markdown 写完接口文档后，想根据接口文档自动生成一个目录

<!--more-->

### 代码分析

在 html 中

```
<p>
	<a href="#interface1">接口1</a>
</p>
```	

会跳转到

```
<h3>
	<span id="interface1">接口1</span>
</h3>
```

在 markdown 里面

```
### end
```

对应的 html 为（不同的 markdown 编辑器，可能不一样）

```
<h3 id="end">
	<a href="#end" class="headerlink" title="end"></a>
	end
</h3>
```

在 markdown 里面

```
[end](#end)
```

对应的 html 为（不同的 markdown 编辑器，可能不一样）

```
<p>
	<a href="#end">end</a>
</p>
```


转换用的 python 代码


```
#!/usr/bin/python
#coding:utf-8

import sys
import re

markdownFileName = sys.argv[1]

for line in open(markdownFileName):
    matchSharp = re.search(r"^#+", line)
    matchLine = re.search(r"^#([\s\S]*)", line)
    if matchLine:
        title = re.sub("^#* +", "", matchLine.group(0))
        title = re.sub("\n", "", title)
        result = "* [" + title + "]" + "(#" + title + ")"
        for x in range(0, len(matchSharp.group(0))):
            result = " " + result
        print(result) 
```

使用方法

```
python produceMDCategory.py test.md
```

把输出的内容，拷贝到对应的 md 文件即可

###  end

##### end




# 1

## 2

### 3

#### 4

##### 5

###### 6


