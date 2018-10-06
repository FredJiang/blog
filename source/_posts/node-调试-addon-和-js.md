---
title: node 调试 addon 和 js
date: 2018-09-15 08:57:37
tags: [nodejs, c++, javascript]
---

* [node-gyp 使用](../../../../2018/09/06/node-gyp-使用/)
* [vscode 调试 node addon 源码](../../../../2018/09/07/vscode-调试-node-addon-源码/)
* [xcode 调试 node addon 源码](../../../../2018/09/07/xcode-调试-node-addon-源码/)
* [nodejs terminal 调试](../../../../2018/09/09/nodejs-terminal-调试/)
* [lldb 调试 node addon 源码](../../../../2018/09/09/lldb-调试-node-addon-源码/)

<!--more-->

test.js

```js
//
console.log('js 1');

console.log('js 2');

const first = require('./build/Debug/first');
first.first();

console.log('js 3');

console.log('js 4');

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
    std::cout << "cpp Method" << std::endl;
    Isolate* isolate = args.GetIsolate();
    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "first build"));
}

void init(Local<Object> exports)
{
    std::cout << "cpp init" << std::endl;
    NODE_SET_METHOD(exports, "first", Method);
}

NODE_MODULE(addon, init)

}
```

编译 addon

```sh
cd /Users/Fred/workspaceC/nyaa-nodejs-demo/1firstBuild && \
node-gyp clean && \
node-gyp configure --debug && \
node-gyp build --debug && \
mkdir build/Debug && \
cp build/Debug/first.node build/Debug
```

调试 js

```sh
/Users/Fred/.nvm/versions/node/v10.4.0/bin/node inspect /Users/Fred/workspaceC/nyaa-nodejs-demo/1firstBuild/test.js
setBreakpoint('test.js', 3)
setBreakpoint('test.js', 5)
setBreakpoint('test.js', 10)
setBreakpoint('test.js', 12)
r
c
.
.
.
.exit
```

调试 addon

```sh
lldb -- /Users/Fred/.nvm/versions/node/v10.4.0/bin/node /Users/Fred/workspaceC/nyaa-nodejs-demo/1firstBuild/test.js

b first.cpp:14
b first.cpp:21
r
c
.
.
.
q
```

addon 和 js 一块调试

```sh
lldb -- /Users/Fred/.nvm/versions/node/v10.4.0/bin/node inspect /Users/Fred/workspaceC/nyaa-nodejs-demo/1firstBuild/test.js
b first.cpp:14
b first.cpp:21
r
c
.exit
q
```

上面的操作直接进入了 inspect，lldb 里面的断点无效



testTimeout.js

```js
//

setTimeout(() => {
  console.log('js 1');

  console.log('js 2');

  const first = require('./build/Debug/first');
  first.first();

  console.log('js 3');

  console.log('js 4');
}, 1000 * 20);

```

调试 js

```sh
/Users/Fred/.nvm/versions/node/v10.4.0/bin/node /Users/Fred/workspaceC/nyaa-nodejs-demo/1firstBuild/testTimeout.js

node inspect -p `ps aux | grep 'node' | grep 'testTimeout' | awk '{print $2}'`

setBreakpoint('testTimeout.js', 3)
setBreakpoint('testTimeout.js', 5)
setBreakpoint('testTimeout.js', 10)
setBreakpoint('testTimeout.js', 12)
```

addon 和 js 一块调试

```sh
/Users/Fred/.nvm/versions/node/v10.4.0/bin/node /Users/Fred/workspaceC/nyaa-nodejs-demo/1firstBuild/testTimeout.js


node inspect -p `ps aux | grep -v 'lldb' | grep 'node' | grep 'testTimeout' | awk '{print $2}'`

setBreakpoint('testTimeout.js', 6)
setBreakpoint('testTimeout.js', 11)
setBreakpoint('testTimeout.js', 13)


lldb -p `ps aux | grep -v 'lldb' | grep 'node' | grep 'testTimeout' | awk '{print $2}'`

b first.cpp:14
b first.cpp:21
```

{% asset_img "1.png" "" %}
