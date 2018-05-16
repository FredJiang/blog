---
title: gdb 使用
date: 2018-04-28 17:12:00
tags: [gdb, c, c++]
---


<http://xmodulo.com/gdb-command-line-debugger.html>

<!--more-->

main.c

```
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
    int i;
    int a=0, b=0, c=0;
    double d;
    for (i=0; i<100; i++)
    {
        a++;
        if (i>97)
            d = i / 2.0;
        b++;
    }
    return 0;
}
```


First and foremost, you will need to compile your program with the flag "-g" (for debug) to run it via GDB.

```
gcc -g main.c -o main
gdb -tui ./main
```

`man gdb`

|                           命令                          | 简写 |                                                              作用                                                              |
|---------------------------------------------------------|------|--------------------------------------------------------------------------------------------------------------------------------|
| break                                                   | b    | 打断点                                                                                                                         |
| break [line number]                                     |      | set a breakpoint at a line number of the current source file                                                                   |
| break [file name]:[line number]                         |      | at a line number of a specific source file                                                                                     |
| break [function name]                                   |      | at a particular function                                                                                                       |
| break [line number] if [condition]                      |      | set conditional breakpoints                                                                                                    |
| break 11 if i > 97                                      |      | 在当前文件中的第 11 行，如果 i 大于 97                                                                                         |
| run [command line arguments if your program takes some] | r    | run the program                                                                                                                |
| watch [variable]                                        |      | 观察变量值                                                                                                                     |
| watch x == 3                                            |      | Sets a watchpoint, which pauses the program when a condition changes (when x == 3 changes)                                     |
| bt                                                      |      | backtrack will tell us how we got to that point                                                                                |
| info locals                                             |      | display all the local variables and their current values                                                                       |
| p [variable]                                            |      | 查看变量值                                                                                                                     |
| print x                                                 |      | Prints current value of variable x                                                                                             |
| ptype [variable]                                        |      | 查看变量类型                                                                                                                   |
| display x                                               |      | Constantly displays the value of variable x, which is shown after every step or pause                                          |
| undisplay x                                             |      | Removes the constant display of a variable displayed by display command                                                        |
| set var [variable] = [new value]                        |      | override the value of the variable                                                                                             |
| step                                                    | s    | If it’s a function, it will jump into the function, execute the first statement, then pause                                    |
| next                                                    | n    | Runs the program until next line, then pause                                                                                   |
| finish                                                  | f    | Finishes executing the current function, then pause (also called step out). Useful if you accidentally stepped into a function |
| delete [line number]                                    | d    | delete a breakpoint                                                                                                            |
| continue                                                | c    | keep running the program from the current breakpoint                                                                           |
| quit                                                    | q    | exit GDB                                                                                                                       |


* <https://www.tutorialspoint.com/gnu_debugger/index.htm>


|    命令    |                                作用                                |
|------------|--------------------------------------------------------------------|
| b main     | - Puts a breakpoint at the beginning of the program                |
| b          | - Puts a breakpoint at the current line                            |
| b N        | - Puts a breakpoint at line N                                      |
| b +N       | - Puts a breakpoint N lines down from the current line             |
| b fn       | - Puts a breakpoint at the beginning of function "fn"              |
| d N        | - Deletes breakpoint number N                                      |
| info break | - list breakpoints                                                 |
| r          | - Runs the program until a breakpoint or error                     |
| c          | - Continues running the program until the next breakpoint or error |
| f          | - Runs until the current function is finished                      |
| s          | - Runs the next line of the program                                |
| s N        | - Runs the next N lines of the program                             |
| n          | - Like s, but it does not step into functions                      |
| u N        | - Runs until you get N lines in front of the current line          |
| p var      | - Prints the current value of the variable "var"                   |
| bt         | - Prints a stack trace                                             |
| u          | - Goes up a level in the stack                                     |
| d          | - Goes down a level in the stack                                   |
| q          | - Quits gdb                                                        |


在 emacs 中使用

<http://emacser.com/emacs-gdb.htm>
