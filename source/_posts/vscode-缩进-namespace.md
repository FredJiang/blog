---
title: vscode 缩进 namespace
date: 2018-06-06 09:51:41
tags: [clang-format, c++, vscode]
---

查看有哪些配置

<https://clang.llvm.org/docs/ClangFormatStyleOptions.html>

```
clang-format -style=llvm   -dump-config
clang-format -style=Google -dump-config
```

<!--more-->

`.clang-format` 文件

```
# Defines the Google C++ style for automatic reformatting.
# http://clang.llvm.org/docs/ClangFormatStyleOptions.html
BasedOnStyle: Google
DerivePointerAlignment: false
MaxEmptyLinesToKeep: 1
NamespaceIndentation: All
```


直接使用命令 

```
clang-format include/v8.h

clang-format -i include/v8.h # -i : - Inplace edit <file>s, if specified.
```

vscode 配置

```
"C_Cpp.clang_format_fallbackStyle": "Google",
"C_Cpp.clang_format_path": "/usr/local/bin/clang-format",
```

