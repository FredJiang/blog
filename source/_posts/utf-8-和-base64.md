---
title: utf-8 和 base64
date: 2017-08-21 17:14:33
tags: [UTF-8, base64]
---

### UTF-8/UTF-16

* UTF-8 and UTF-16 are ways to encode Unicode text.
* UTF-8 and UTF-16 are methods to encode Unicode strings to byte sequences.

### BASE64

* Base64 is a way to encode binary data.
* Base64 is a method to encode a byte sequence to a string.
* Base64 is a way of representing binary values as text so that you do not conflict with common control codes like \x0A for newline or for a string terminator. It is not for turning typed text into binary.
* There is no System.Text.Encoding.Base64 because Base64 is not a text encoding but rather a base conversion like the hexadecimal that uses 0–9 and A–F (or a–f) to represent numbers.

### 区别

* When you encode text in ASCII, you start with a text string and convert it to a sequence of bytes.
* When you encode data in Base64, you start with a sequence of bytes and convert it to a text string.

参考

* <https://www.techboxquery.com/question/what-is-the-difference-between-UTF-8UTF-16-and-base64-encoding/>
* <http://www.ruanyifeng.com/blog/2008/06/mime.html>
* <http://www.ruanyifeng.com/blog/2008/06/base64.html>
* <https://stackoverflow.com/questions/3538021/why-do-we-use-base64>