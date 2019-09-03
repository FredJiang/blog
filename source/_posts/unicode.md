---
title: unicode
date: 2019-07-29 14:15:56
tags: [unicode, utf8]
---

* <https://unicode-table.com/en/>
* <https://tool.chinaz.com/tools/unicode.aspx>

<!--more-->

<https://www.spss-tutorials.com/unicode/>

Unicode

* Unicode is basically a huge list consisting of all characters used in all languages. All characters have a code point (starting from zero) by which they can referenced.
* In contrast to code pages, not all characters in Unicode are represented by a single byte. Remember that one byte can represent 256 different characters. This is not nearly sufficient for the 110,000+ characters making up Unicode.
* An easy solution for this seems using three bytes for each character. (Note that two bytes can represent 65,536 characters which is still not sufficient for all characters in Unicode.)
* However, this has two disadvantages. The first is that a lot of file sizes will triple if every character needs 3 bytes instead of 1. Note that web pages also consist mostly of text so this would substantially increase the pressure on the network capacity of the internet.
* Second, all existing text that was once encoded using a single byte code page can't be represented at all by a three byte code page. This incompatibility arises because three letters in the original document (three bytes) would now show up as a single letter (three bytes).
* However, a brilliant solution was invented that solves both problems. It is called Universal Transformation Format - 8 bit, commonly abbreviated to UTF-8.

UTF-8

* The essence of UTF-8 is that each character may be represented by either one, two or more bytes. This is called variable width character encoding: the number of bytes representing each character differs between characters.
* But consider the following. A text file containing three bytes is opened. Do these three bytes represent three separate characters? Possibly. But they could also represent a single three byte character. Or one two byte character followed by a single byte character (or reversely).
* So how can a text editor know how to interpret three bytes? The trick here is that some of the bits in each byte are reserved to indicate how bytes are grouped into characters. We'll call these control bits. Only the remaining bits are converted into a decimal number - for which the corresponding character is then fetched from Unicode table.
