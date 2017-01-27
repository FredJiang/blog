---
title: emacs ctrl shift 无效
date: 2017-01-20 10:08:09
tags: [emacs, ternimal]
---


在 mac 的 terminal 中，使用 emacs 的 [multiple-cursors](https://github.com/magnars/multiple-cursors.el) 库，绑定快捷键 `(global-set-key (kbd "C-S-c C-S-c") 'mc/edit-lines)` 无效。为此我还把 terminal 换成了 iterm，然而并没有什么。。


原因如下：

<!--more-->

参考 <https://catern.com/posts/terminal_quirks.html>

摘录

* The "Ctrl" or "Control" key is so called because it is used to send control characters. Control characters are not actual characters, but are rather used to control the terminal that they are "printed" on. 
* To send a control character to the application running in a terminal, hold down Ctrl while pressing another character. This modifies the sent character code by clearing its 7th and 6th bits (indexed starting at 1). For reference, the 7th and 6th bits are the ones set in 0140. This is equivalent to bitwise anding the character code with 0037. Again, whenever you hold down Ctrl and press another character while in a terminal, the 8-bit character code that represents that character is modified according to this scheme.


综上：

`C-S-c` 即 control + C

`C-c` 即 control + c

C（0100 0011） 和 c（0110 0011） 去掉 第 6 和第 7 bit，结果是一样的。原来大小写差的 32 是 第 6 位（0010 0000）啊。