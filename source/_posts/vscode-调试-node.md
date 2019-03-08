---
title: vscode 调试 node
date: 2018-11-15 09:54:02
tags: [vscode, node, debug, ide, test, mocha]
---

launch.json

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/bin/www",
      "env": {
        "NODE_ENV": "dev"
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Mocha Tests",
      "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
      "args": [
              "-u",
              "tdd",
              "--timeout",
              "999999",
              "--colors",
              "yourTestFile.js"
      ],
      "internalConsoleOptions": "openOnSessionStart"
      }
  ]
}
```