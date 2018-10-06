---
title: nodejs terminal 调试
date: 2018-09-09 23:26:08
tags: [nodejs, terminal, debug]
---

<https://nodejs.org/api/debugger.html>

```
node --version
v10.4.0
```

<!--more-->

myscript.js

```js
console.log('1');

console.log('2');

console.log('3');

console.log('4');
```

<br>

`node inspect myscript.js`

|           命令           | 命令缩写 |                                作用                                |      备注      |
|--------------------------|----------|--------------------------------------------------------------------|----------------|
| help                     |          |                                                                    | help + command |
| run                      |          |                                                                    |                |
| cont                     | c        | continue execution                                                 |                |
| next                     | n        | step next                                                          |                |
| step                     | s        | step in                                                            |                |
| out                      | o        | step out                                                           |                |
| pause                    |          | pause running code                                                 |                |
| enter                    |          | without typing a command will repeat the previous debugger command |                |
| watch('my_expression')   |          |                                                                    |                |
| unwatch('my_expression') |          |                                                                    |                |
| watchers                 |          | print the active watchers                                          |                |
| .exit                    |          |                                                                    |                |


* setBreakpoint(), sb() - Set breakpoint on current line
* setBreakpoint(line), sb(line) - Set breakpoint on specific line
* setBreakpoint('fn()'), sb(...) - Set breakpoint on a first statement in functions body
* setBreakpoint('script.js', 1), sb(...) - Set breakpoint on first line of script.js
* clearBreakpoint('script.js', 1), cb(...) - Clear breakpoint in script.js on line 1

调试已经在运行的程序

```
node bin/www

lsof -i:7007

node inspect -p <node-pid>

setBreakpoint('app.js', 23)
```

{% asset_img "1.png" "" %}
