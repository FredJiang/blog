---
title: vscode 调试 go
date: 2018-06-19 08:39:26
tags: [vscode, go, debug, ide]
---

<https://github.com/Microsoft/vscode-go/wiki/Debugging-Go-code-using-VS-Code>

<!--more-->

```
xcode-select --install
go get -u github.com/derekparker/delve/cmd/dlv
```

launch.json

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch",
            "type": "go",
            "request": "launch",
            "mode": "debug",
            "remotePath": "",
            "port": 2345,
            "host": "127.0.0.1",
            "program": "${fileDirname}", // "program": "/Users/Fred/workspacego/src/demo/",
            "env": {
                "GOPATH":"/Users/Fred/workspacego"
            },
            "args": [],
            "showLog": true
        }
    ]
}
```

