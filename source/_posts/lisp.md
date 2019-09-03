---
title: lisp
date: 2019-05-17 18:11:26
tags: [list, emacs]
---

LISP expressions are called symbolic expressions or s-expressions. The s-expressions are composed of three valid objects, atoms, lists and strings.
<https://www.tutorialspoint.com/lisp/lisp_basic_syntax.htm>

Any s-expression is a valid program.

LISP programs run either on an interpreter or as compiled code.

<!--more-->

<https://www.gnu.org/software/emacs/manual/html_node/efaq/Evaluating-Emacs-Lisp-code.html>

* In emacs-lisp-mode, typing C-M-x evaluates a top-level form before or around point.
* Typing M-: or M-x eval-expression allows you to type a Lisp form in the minibuffer which will be evaluated once you press <RET>.
* Typing C-x C-e in any buffer evaluates the Lisp form immediately before point and prints its value in the echo area.

```lisp
(message "hello world!")
```

* The letter t, that stands for logical true.
* The value nil, that stands for logical false, as well as an empty list.
* At times, we need to take atoms or lists literally and don't want them evaluated or treated as function calls. To do this, we need to precede the atom or the list with a single quotation mark.
