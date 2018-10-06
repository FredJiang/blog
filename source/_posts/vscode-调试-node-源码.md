---
title: vscode 调试 node 源码
date: 2018-05-29 18:07:46
tags: [node.js, clion, c++, javascript, ide, debug, vscode]
---

[clion 调试 node 源码](../../../../2018/05/21/clion-调试-node-源码/)

<!--more-->

代码跳转有问题

{% asset_img "1.png" "" %}

使用 vscode

安装插件

{% asset_img "2.png" "" %}

打开项目

{% asset_img "3.png" "" %}

开始调试

{% asset_img "4.png" "" %}

{% asset_img "5.png" "" %}

配置文件如下

`.vscode/launch.json`

* <https://github.com/Microsoft/vscode-cpptools/blob/master/launch.md>
* <https://code.visualstudio.com/docs/languages/cpp>

```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "(lldb) Launch",
            "type": "cppdbg",
            "request": "launch",
            "preLaunchTask":"(make) build",
            "program": "${workspaceFolder}/out/Debug/node",
            "args": ["/Users/Fred/Desktop/nodetest/debug.js"],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "lldb"
        }
    ]
}
```

`.vscode/tasks.json`

```
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "(make) build",
            "type": "shell",
            "command": "make -j2 -C out BUILDTYPE=Debug",
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "problemMatcher":"$gcc"
        }
    ]
}
```

调试界面

{% asset_img "6.png" "" %}

再贴一个 terminal 的配置

```
{
    "terminal.explorerKind": "external",
    "terminal.external.osxExec": "iTerm.app",
    "terminal.integrated.fontFamily": "Ubuntu Mono derivative Powerline",
    "terminal.integrated.fontSize": 16,
    "terminal.integrated.copyOnSelection": true
}
```
