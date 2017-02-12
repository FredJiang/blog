---
title: node addon
date: 2017-02-12 14:28:44
tags: [node, c++, v8]
---

在 node 中使用 C++

参考 <https://nodejs.org/api/addons.html>


<!--more-->

目录结构

```
├── binding.gyp
└── hello.cc
```

binding.gyp

```
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "hello.cc" ]
    }
  ]
}
```

hello.cc 

```
// hello.cc
#include <node.h>

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
}

NODE_MODULE(addon, init)

}  // namespace demo
```


执行

```
npm install -g node-gyp
node-gyp configure
```


目录结构

```
├── binding.gyp
├── build
│   ├── addon.target.mk
│   ├── binding.Makefile
│   ├── config.gypi
│   └── Makefile
└── hello.cc
```

执行

`node-gyp build`


目录结构

```
├── binding.gyp
├── build
│   ├── addon.target.mk
│   ├── binding.Makefile
│   ├── config.gypi
│   ├── Makefile
│   └── Release
│       ├── addon.node
│       └── obj.target
│           ├── addon
│           │   └── hello.o
│           └── addon.node
└── hello.cc
```

添加文件 hello.js

```
├── binding.gyp
├── build
│   ├── addon.target.mk
│   ├── binding.Makefile
│   ├── config.gypi
│   ├── Makefile
│   └── Release
│       ├── addon.node
│       └── obj.target
│           ├── addon
│           │   └── hello.o
│           └── addon.node
├── hello.cc
└── hello.js
```

hello.js

```
// hello.js
const addon = require('./build/Release/addon');

console.log(addon.hello());
// Prints: 'world'
```

执行

```
node hello.js
world
```
