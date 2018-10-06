---
title: node 执行 console.log
date: 2018-05-26 11:25:31
tags: [node.js, javascript, c++, v8]
---

参考 `node/deps/v8/samples/hello-world.cc` 里面的代码

```
    // Create a string containing the JavaScript source code.
    Local<String> source =
        String::NewFromUtf8(isolate, "'Hello' + ', World!'",
                            NewStringType::kNormal).ToLocalChecked();

    // Compile the source code.
    Local<Script> script = Script::Compile(context, source).ToLocalChecked();

    // Run the script to get the result.
    Local<Value> result = script->Run(context).ToLocalChecked();
```

<!--more-->

找到 `Script::Compile`

{% asset_img "1.png" "" %}


打断点，跳到

```
src/node.cc
1947:      v8::Script::Compile(env->context(), source, &origin);
```


参看 <https://gist.github.com/NickNaso/ea1c38804483fc76f5925b8012a7f112>

```c++
#include "v8.h"
#include "helpers.h"

#include <iostream>

using v8::Local;
using v8::String;
using v8::Array;

void PrintLocalString(v8::Local<v8::String> key){
  uint32_t utf8_length = key->Utf8Length();
  char* buffer = new char[utf8_length];
  key->WriteUtf8(buffer);
  std::cout << buffer  << std::endl;
  // smart pointers can't be used as WriteUtf8 takes plain char *
  // e.g. std::unique_ptr<char*> buffer = new char[utf8_length];
  // so we have to clean memory explicitly
  delete[] buffer;
}

void PrintLocalArray(v8::Local<v8::Array> arr){
  int length = arr->Length();
  for (int i = 0; i < length; i++) {
    Local<String> key = arr->Get(i)->ToString();
    PrintLocalString(key);
  }
  std::cout << std::endl;
}
```


添加打印信息的代码

```diff
gitdiff src/node.cc

HEAD detached at v8.9.4
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   src/node.cc

Untracked files:
  (use "git add <file>..." to include in what will be committed)

    CMakeLists.txt
    cmake-build-debug/

no changes added to commit (use "git add" and/or "git commit -a")

diff --git a/src/node.cc b/src/node.cc
index d16372937d..c103379a24 100644
--- a/src/node.cc
+++ b/src/node.cc
@@ -28,7 +28,7 @@
28: #include "node_revert.h"
29: #include "node_debug_options.h"
30: #include "node_perf.h"
  :-
31:+#include <iostream>
32: #if defined HAVE_PERFCTR
33: #include "node_counters.h"
34: #endif
@@ -1930,6 +1930,16 @@ static void ReportException(Environment* env, const TryCatch& try_catch) {
1930:   ReportException(env, try_catch.Exception(), try_catch.Message());
1931: }
1932:
1933:+static void PrintLocalString(v8::Local<v8::String> key){
1934:+    uint32_t utf8_length = key->Utf8Length();
1935:+    char* buffer = new char[utf8_length];
1936:+    key->WriteUtf8(buffer);
1937:+    std::cout << buffer  << std::endl;
1938:+    // smart pointers can't be used as WriteUtf8 takes plain char *
1939:+    // e.g. std::unique_ptr<char*> buffer = new char[utf8_length];
1940:+    // so we have to clean memory explicitly
1941:+    delete[] buffer;
1942:+}
1943:
1944: // Executes a str within the current v8 context.
1945: static Local<Value> ExecuteString(Environment* env,
@@ -1938,6 +1948,9 @@ static Local<Value> ExecuteString(Environment* env,
1948:   EscapableHandleScope scope(env->isolate());
1949:   TryCatch try_catch(env->isolate());
1950:
1951:+  PrintLocalString(source);
1952:+  PrintLocalString(filename);
1953:+
1954:   // try_catch must be nonverbose to disable FatalException() handler,
1955:   // we will handle exceptions ourself.
1956:   try_catch.SetVerbose(false);
```

重新编译

```
# ./configure --debug 只用运行一次
make -j2 -C out BUILDTYPE=Debug
```

运行调试

如果需要调试 javascript 代码话，可以在 chrome 打开 `chrome://inspect`

[chrome 调试 node](../../../../2018/05/21/chrome-调试-node/)


{% asset_img "2.png" "" %}

这里加载了一个文件 bootstrap_node.js，没有看到要调试的 debug.js 文件

debug.js 文件的内容如下

```

console.log(1);
console.log(2);
console.log(3);
console.log(4);
```

那就先来看下 `lib/internal/bootstrap_node.js` 做了什么

看了一下，`lib/internal/bootstrap_node.js` 会把 `node debug.js` 的 `debug.js` 加载进来


```diff
gitdiff

HEAD detached at v8.9.4
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   lib/internal/bootstrap_node.js
    modified:   src/node.cc

Untracked files:
  (use "git add <file>..." to include in what will be committed)

    CMakeLists.txt
    cmake-build-debug/

no changes added to commit (use "git add" and/or "git commit -a")

diff --git a/lib/internal/bootstrap_node.js b/lib/internal/bootstrap_node.js
index 48a4588543..023276f7bd 100644
--- a/lib/internal/bootstrap_node.js
+++ b/lib/internal/bootstrap_node.js
@@ -135,6 +135,13 @@
135:     } else {
136:       // There is user code to be run
137:
138:+      console.log('this is user code to be run');
139:+      console.log(process.argv[1]);
140:+      console.log(process.env.NODE_UNIQUE_ID);
141:+      console.log(process._eval);
142:+      console.log(process._forceRepl);
143:+      console.log(process._syntax_check_only);
144:+
145:       // If this is a worker in cluster mode, start up the communication
146:       // channel. This needs to be done before any user code gets executed
147:       // (including preload modules).
@@ -162,6 +169,8 @@
169:         internalModule.addBuiltinLibsToObject(global);
170:         evalScript('[eval]');
171:       } else if (process.argv[1] && process.argv[1] !== '-') {
172:+        console.log(`process.argv[1] && process.argv[1] !== '-'`);
173:+
174:         perf.markMilestone(NODE_PERFORMANCE_MILESTONE_MODULE_LOAD_START);
175:         // make process.argv[1] into a full path
176:         const path = NativeModule.require('path');
@@ -171,10 +180,13 @@
180:
181:         // check if user passed `-c` or `--check` arguments to Node.
182:         if (process._syntax_check_only != null) {
183:+          console.log('process._syntax_check_only != null');
184:+
185:           const fs = NativeModule.require('fs');
186:           // read the source
187:           const filename = Module._resolveFilename(process.argv[1]);
188:           var source = fs.readFileSync(filename, 'utf-8');
189:+
190:           checkScriptSyntax(source, filename);
191:           process.exit(0);
192:         }
@@ -236,6 +248,7 @@
248:         }
249:       }
250:     }
251:+    console.log('NODE_PERFORMANCE_MILESTONE_BOOTSTRAP_COMPLETE', NODE_PERFORMANCE_MILESTONE_BOOTSTRAP_COMPLETE);
252:     perf.markMilestone(NODE_PERFORMANCE_MILESTONE_BOOTSTRAP_COMPLETE);
253:   }
254:
@@ -316,6 +329,9 @@
329:       }
330:     });
331:     setupInspector(originalConsole, wrappedConsole, Module);
332:+
333:+    console.log('console log process after set console');
334:+    console.log(process.argv);
335:   }
336:
337:   function setupInspector(originalConsole, wrappedConsole, Module) {
@@ -473,6 +489,9 @@
489:   }
490:
491:   function checkScriptSyntax(source, filename) {
492:+    console.log("function checkScriptSyntax", filename);
493:+    console.log("function checkScriptSyntax", source);
494:+
495:     const Module = NativeModule.require('module');
496:     const vm = NativeModule.require('vm');
497:     const internalModule = NativeModule.require('internal/module');
@@ -569,10 +588,13 @@
588:
589:
590:   NativeModule.getSource = function(id) {
591:+    console.log('NativeModule.getSource', id);
592:+
593:     return NativeModule._source[id];
594:   };
595:
596:   NativeModule.wrap = function(script) {
597:+    console.log('NativeModule.wrap', script)
598:     return NativeModule.wrapper[0] + script + NativeModule.wrapper[1];
599:   };
600:
@@ -583,7 +605,12 @@
605:
606:   NativeModule.prototype.compile = function() {
607:     var source = NativeModule.getSource(this.id);
608:+
609:+    console.log('NativeModule.prototype.compile', this.id);
610:+    console.log('NativeModule.prototype.compile', source);
611:+
612:     source = NativeModule.wrap(source);
613:+    console.log('NativeModule.prototype.compile', source);
614:
615:     this.loading = true;
616:
diff --git a/src/node.cc b/src/node.cc
index d16372937d..2135663269 100644
--- a/src/node.cc
+++ b/src/node.cc
@@ -28,7 +28,7 @@
28: #include "node_revert.h"
29: #include "node_debug_options.h"
30: #include "node_perf.h"
  :-
31:+#include <iostream>
32: #if defined HAVE_PERFCTR
33: #include "node_counters.h"
34: #endif
@@ -1930,6 +1930,19 @@ static void ReportException(Environment* env, const TryCatch& try_catch) {
1930:   ReportException(env, try_catch.Exception(), try_catch.Message());
1931: }
1932:
1933:+static void PrintLocalString(v8::Local<v8::String> key){
1934:+  uint32_t utf8_length = key->Utf8Length();
1935:+  // std::cout << key->Utf8Length() << std::endl;
1936:+  // std::cout << key->Length() << std::endl;
1937:+
1938:+  char* buffer = new char[utf8_length];
1939:+  key->WriteUtf8(buffer);
1940:+  std::cout << buffer << std::endl;
1941:+  // smart pointers can't be used as WriteUtf8 takes plain char *
1942:+  // e.g. std::unique_ptr<char*> buffer = new char[utf8_length];
1943:+  // so we have to clean memory explicitly
1944:+  delete[] buffer;
1945:+}
1946:
1947: // Executes a str within the current v8 context.
1948: static Local<Value> ExecuteString(Environment* env,
@@ -1938,6 +1951,9 @@ static Local<Value> ExecuteString(Environment* env,
1951:   EscapableHandleScope scope(env->isolate());
1952:   TryCatch try_catch(env->isolate());
1953:
1954:+//  PrintLocalString(source);
1955:+//  PrintLocalString(filename);
1956:+
1957:   // try_catch must be nonverbose to disable FatalException() handler,
1958:   // we will handle exceptions ourself.
1959:   try_catch.SetVerbose(false);
```

不过看了一圈，好像和 console.log 没什么关系。。。

直接看 `lib/console.js`，看下 js 和 c++ 到底是怎么扯上关系的

在 `lib/console.js` 里

```
////////////////////////////////////////////////////////////////
Console.prototype.log = function log(...args) {
  write(this._ignoreErrors,
        this._stdout,
        util.format.apply(null, args),
        this._stdoutErrorHandler,
        this[kGroupIndent]);
};

////////////////////////////////////////////////////////////////
function write(ignoreErrors, stream, string, errorhandler, groupIndent) {
  if (groupIndent.length !== 0) {
    if (string.indexOf('\n') !== -1) {
      string = string.replace(/\n/g, `\n${groupIndent}`);
    }
    string = groupIndent + string;
  }
  string += '\n';

  if (!ignoreErrors) return stream.write(string);

////////////////////////////////////////////////////////////////
function Console(stdout, stderr, ignoreErrors = true) {
  if (!(this instanceof Console)) {
    return new Console(stdout, stderr, ignoreErrors);
  }
  if (!stdout || typeof stdout.write !== 'function') {
    throw new TypeError('Console expects a writable stream instance');
  }
  if (!stderr) {
    stderr = stdout;
  } else if (typeof stderr.write !== 'function') {
    throw new TypeError('Console expects writable stream instances');
  }

  var prop = {
    writable: true,
    enumerable: false,
    configurable: true
  };
  prop.value = stdout;
  Object.defineProperty(this, '_stdout', prop);

////////////////////////////////////////////////////////////////
module.exports = new Console(process.stdout, process.stderr);
```

可以看到 `console.log` 使用 `process.stdout` 来实现打印输出的

那么 `process.stdout` 从哪来的？

回到 `lib/internal/bootstrap_node.js`

```
(function(process) {

  function startup() {
    const EventEmitter = NativeModule.require('events');
    process._eventsCount = 0;
```


再回到 `src/node.cc`

```
// Executes a str within the current v8 context.
static Local<Value> ExecuteString(Environment* env,
                                  Local<String> source,
                                  Local<String> filename) {
  EscapableHandleScope scope(env->isolate());
  TryCatch try_catch(env->isolate());

//  PrintLocalString(source);
//  PrintLocalString(filename);

  // try_catch must be nonverbose to disable FatalException() handler,
  // we will handle exceptions ourself.
  try_catch.SetVerbose(false);

  ScriptOrigin origin(filename);
  MaybeLocal<v8::Script> script =
      v8::Script::Compile(env->context(), source, &origin);
  if (script.IsEmpty()) {
    ReportException(env, try_catch);
    exit(3);
  }

  Local<Value> result = script.ToLocalChecked()->Run();
  if (result.IsEmpty()) {
    ReportException(env, try_catch);
    exit(4);
  }

  return scope.Escape(result);
}
```

卡在这了，先查下 js 和 c++ 怎么交互的吧

<https://github.com/v8/v8/wiki/Embedder%27s-Guide>

`samples/hello-world.cc`

```
./out.gn/x64.debug/v8_hello_world

Hello, World!
```

`samples/process.cc`

```
./out.gn/x64.debug/v8_sample_process ./samples/count-hosts.js

google.com: 1
google.net: 1
google.org: 1
yahoo.com: 3
```


* [v8 hello-world.cc 分析](../../../../2018/05/27/v8-hello-world-cc-分析/)
* <https://github.com/v8/v8/wiki/Embedder%27s-Guide>


再来看 process

{% asset_img "3.png" "" %}

* `ag '"process"' --ignore deps --ignore '*\.js'`
* `ag 'stdout' -G 'c$' --ignore deps`
* `ag SetupProcessObject`


stdout 没找到，先随便改个东西皮一下

{% asset_img "4.png" "" %}

再来一波这个操作

{% asset_img "5.png" "" %}

嗯，结论好像是 console 通过 process 使用 stdout 来输出

但是 process 和 stdout 在哪扯上关系的呢？

`ag '"process"' --ignore deps --ignore '*\.js'`

```
src/process_wrap.cc
55:        FIXED_ONE_BYTE_STRING(env->isolate(), "Process");

src/env.cc
81:  process_template->SetClassName(FIXED_ONE_BYTE_STRING(isolate(), "process"));
```

看 `src/env.cc`

```
  auto process_template = FunctionTemplate::New(isolate());
  process_template->SetClassName(FIXED_ONE_BYTE_STRING(isolate(), "process"));

  auto process_object =
      process_template->GetFunction()->NewInstance(context()).ToLocalChecked();
  set_process_object(process_object);

  SetupProcessObject(this, argc, argv, exec_argc, exec_argv);
  LoadAsyncWrapperInfo(this);
```


看 `set_process_object(process_object);`

{% asset_img "6.png" "" %}

看 `FunctionTemplate::New(isolate())`

