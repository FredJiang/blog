---
title: lldb 使用
date: 2018-09-09 11:03:59
tags: [gdb, c, c++, lldb, debugger]
---

<https://aaronbloomfield.github.io/pdr/docs/gdb_vs_lldb.html>

<!--more-->

prog1.cpp

```cpp
#include <iostream>
using namespace std;

void my_subroutine() {
    cout << "Hello world" << endl;
}

int main() {
    int x = 4;
    int *p = NULL;
    my_subroutine();
    *p = 3;
    cout << x << ", " << *p << endl;
    return 0;
}
```

<br>

`clang++ -Wall -g -o prog1 prog1.cpp`

<br>

`lldb prog1`

<br>
 
```
(lldb) target create "prog1"
Traceback (most recent call last):
  File "<input>", line 1, in <module>
  File "/usr/local/Cellar/python@2/2.7.15_1/Frameworks/Python.framework/Versions/2.7/lib/python2.7/copy.py", line 52, in <module>
    import weakref
  File "/usr/local/Cellar/python@2/2.7.15_1/Frameworks/Python.framework/Versions/2.7/lib/python2.7/weakref.py", line 14, in <module>
    from _weakref import (
ImportError: cannot import name _remove_dead_weakref
Current executable set to 'prog1' (x86_64).
(lldb) l
   8    int main() {
   9        int x = 4;
   10       int *p = NULL;
   11       my_subroutine();
   12       *p = 3;
   13       cout << x << ", " << *p << endl;
   14       return 0;
   15   }
(lldb) b 9
Breakpoint 1: where = prog1`main + 15 at prog1.cpp:9, address = 0x000000010000106f
(lldb) br l
Current breakpoints:
1: file = '/Users/Fred/workspaceC/samples/prog1.cpp', line = 9, exact_match = 0, locations = 1
  1.1: where = prog1`main + 15 at prog1.cpp:9, address = prog1[0x000000010000106f], unresolved, hit count = 0

(lldb) r
Process 99959 launched: '/Users/Fred/workspaceC/samples/prog1' (x86_64)
Process 99959 stopped
* thread #1, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
    frame #0: 0x000000010000106f prog1`main at prog1.cpp:9
   6    }
   7
   8    int main() {
-> 9        int x = 4;
   10       int *p = NULL;
   11       my_subroutine();
   12       *p = 3;
Target 0: (prog1) stopped.
(lldb) n
Process 99959 stopped
* thread #1, queue = 'com.apple.main-thread', stop reason = step over
    frame #0: 0x0000000100001076 prog1`main at prog1.cpp:10
   7
   8    int main() {
   9        int x = 4;
-> 10       int *p = NULL;
   11       my_subroutine();
   12       *p = 3;
   13       cout << x << ", " << *p << endl;
Target 0: (prog1) stopped.
(lldb) c
Process 99959 resuming
Hello world
Process 99959 stopped
* thread #1, queue = 'com.apple.main-thread', stop reason = EXC_BAD_ACCESS (code=1, address=0x0)
    frame #0: 0x000000010000108e prog1`main at prog1.cpp:12
   9        int x = 4;
   10       int *p = NULL;
   11       my_subroutine();
-> 12       *p = 3;
   13       cout << x << ", " << *p << endl;
   14       return 0;
   15   }
Target 0: (prog1) stopped.
(lldb) q
Quitting LLDB will kill one or more processes. Do you really want to proceed: [Y/n] y
```





<https://aaronbloomfield.github.io/pdr/docs/lldb_summary.html>


|          命令          | 命令缩写 |                                           作用                                           |                                               备注                                              |
|------------------------|----------|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| help                   |          |                                                                                          | help + command                                                                                  |
| list                   | l        | 显示代码                                                                                 |                                                                                                 |
| run                    | r        | start your program running                                                               |                                                                                                 |
|                        | f        | see the current and surrounding lines                                                    | 在程序 r 之后，程序 pause 时有效                                                                |
| backtrace              | bt       | 显示栈信息                                                                               |                                                                                                 |
| up                     |          | move up to the function that called this one                                             |                                                                                                 |
| down                   |          | moves you back down a frame towards where you started                                    |                                                                                                 |
|========================|==========|==========================================================================================|=================================================================================================|
| break                  | b        | 打断点                                                                                   | a function name (e.g., b my_subroutine)                                                         |
|                        |          |                                                                                          | a line number (e.g., b 12)                                                                      |
|                        |          |                                                                                          | either of the above preceded by a file name (e.g., b prog1.cpp:12 or b prog1.cpp:my_subroutine) |
|========================|==========|==========================================================================================|=================================================================================================|
| breakpoint list        | br list  |                                                                                          |                                                                                                 |
| breakpoint delete      | br del   | delete all breakpoints                                                                   | a specific one (br del 1 or br del my_subroutine), br del [break id]                            |
| tbreak                 |          | the program pauses the first time, but after it pauses there, that breakpoint is cleared |                                                                                                 |
| next                   | n        | steps over that function call                                                            |                                                                                                 |
| step                   | s        | steps into that function                                                                 |                                                                                                 |
| continue               | c        | to resume normal execution until the next breakpoint is reached                          |                                                                                                 |
| finish                 |          | which finishes executing the current function and then pauses                            |                                                                                                 |
| print                  | p        | to see what value a variable or an expression has                                        |                                                                                                 |
| frame variable         |          | show all the local variables of the current scope of execution                           | each level in the stack trace is called a frame                                                 |
| display <var>          |          | display that variable's value each time the program execution hits a breakpoint          |                                                                                                 |
| undisplay <display id> |          |                                                                                          | 怎么显示所有的 display                                                                          |
| expr                   |          | change value in mid-stream before continuing execution                                   | without the semi-colon at the end `expr x = 5` 或 `expr y = countNegValues(list, num)`          |














