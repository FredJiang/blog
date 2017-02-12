---
title: python print
date: 2017-02-09 13:51:18
tags: [python]
---


显示行号和函数名

```
import inspect
print inspect.currentframe().f_lineno, inspect.stack()[0][3]
```