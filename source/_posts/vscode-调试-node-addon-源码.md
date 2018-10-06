---
title: vscode 调试 node addon 源码
date: 2018-09-07 13:38:54
tags: [node.js, c++, javascript, ide, debug, vscode, lldb, node-gyp]
---

* <https://people.cs.vt.edu/~davisjam/node-debugging-cpp-addons/>
* [node-gyp 使用](../../../../2018/09/06/node-gyp-使用/)

<!--more-->

```
cp 1.\ first\ build 1firstBuild
cd 1firstBuild
```

test.js

```js
console.log('start');
const first = require('./build/Debug/first');
first.first();
```

first.cpp

```cpp
#include <node.h>
#include <iostream>
namespace __first__ {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args)
{
    std::cout << "Method" << std::endl;
    Isolate* isolate = args.GetIsolate();
    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "first build"));
}

void init(Local<Object> exports)
{
    std::cout << "init" << std::endl;
    NODE_SET_METHOD(exports, "first", Method);
}

NODE_MODULE(addon, init)

}
```

```sh
node-gyp clean && \
node-gyp configure --debug && \
node-gyp build --debug && \
mkdir build/Debug && \
cp build/Debug/first.node build/Debug
```

vscode 的 launch.json

```json
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
            "program": "/usr/local/bin/node",
            "args": ["/Users/Fred/workspaceC/nyaa-nodejs-demo/1firstBuild/test.js"],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "lldb"
        }
    ]
}
```

调试截图

{% asset_img "vscode.png" "" %}
