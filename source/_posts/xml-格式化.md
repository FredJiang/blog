---
title: xml 格式化
date: 2018-02-20 23:00:03
tags: [xml, emacs, format]
---

使用命令行

<https://stackoverflow.com/questions/16090869/how-to-pretty-print-xml-from-the-command-line>

```
sudo apt-get install libxml2-utils
brew install libxml2
```

`xmllint --format file.xml`

<!--more-->

在 emacs 中 <https://davidcapello.com/blog/emacs/reformat-xml-on-emacs/>

```
(require 'sgml-mode)

(defun reformat-xml ()
  (interactive)
  (save-excursion
    (sgml-pretty-print (point-min) (point-max))
    (indent-region (point-min) (point-max))))
```