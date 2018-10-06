---
title: vscode 配置 typescript
date: 2018-06-06 19:38:38
tags: [typescript, ide, javascript, vscode]
---

安装 tsc

```
npm install -g typescript
npm install -g tslint
```


在工程目录下创建配置文件

`tsc --init`

将 `"target": "es5"` 改为对应的 target, 我这用了 let, 所以选择了 `"target": "ES2015"`

编译(快捷键为 <kbd>⌘</kbd>+<kbd>⇧</kbd>+<kbd>B</kbd> 或 <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>)

选择

`tsc: build - xxx/tsconfig.json` 或 `tsc: watch - xxx/tsconfig.json`


