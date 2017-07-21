---
title: markdown 写数学公式
date: 2017-07-12 21:16:07
tags: [math, markdown, macdown]
---

<script type="text/javascript"
   src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>


我要写这么一个公式

$$ \textstyle h(x)=\sum_{i=0}^n\theta_ix_i=\theta^TX $$


<!--more-->

首先参考 
* <http://www.jeyzhang.com/how-to-insert-equations-in-markdown.html>
* [如何处理Hexo和MathJax的兼容问题](http://2wildkids.com/2016/10/06/%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86Hexo%E5%92%8CMathJax%E7%9A%84%E5%85%BC%E5%AE%B9%E9%97%AE%E9%A2%98/)



相应操作如下


在 <https://webdemo.myscript.com/views/math.html> 上手写一个公式

{% asset_img "webdemo.png" "" %}

得到公式 `8^{2^{2}}`

接着在 markdown 编辑器里使用该公式，我这用的编辑器是 macdown

写法如下

```
<script type="text/javascript"
   src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>

$$ 8^{2^{2}} $$

\\( 8^{2^{2}} \\)
```

得到如下内容

{% asset_img "macdown.png" "" %}




回到我最初的需求，写一个公式

$$ \textstyle h(x)=\sum_{i=0}^n\theta_ix_i=\theta^TX $$




下面先给出几个常用的公式


| 公式                                                    | 公式                                                        |
| ---                                                     | ---                                                         |
| `x_y`                                                   | $$ x_y $$                                                   |
| `x^z`                                                   | $$ x^z $$                                                   |
| `x_y^z`                                                 | $$ x_y^z $$                                                 |
| `\frac{y}{x}`                                           | $$ \frac{y}{x} $$                                           |
| `\sum_{n=1}^\infty \frac{1}{n^2} \to`                   | $$ \sum_{n=1}^\infty \frac{1}{n^2} \to $$                   |
| `\textstyle \sum_{n=1}^\infty \frac{1}{n^2} \to`        | $$ \textstyle \sum_{n=1}^\infty \frac{1}{n^2} \to $$        |
| `\Sigma_{n=1}^\infty \frac{1}{n^2}`                     | $$ \Sigma_{n=1}^\infty \frac{1}{n^2} $$                     |
| `\alpha, \beta, \Delta, \theta, \Sigma, \sigma, \delta` | $$ \alpha, \beta, \Delta, \theta, \Sigma, \sigma, \delta $$ |
| `\partial `                                             | $$ \partial $$


其中

`\alpha, \beta, \Delta, \theta, \Sigma, \sigma, \delta` 

* 具体对应的符号 
    * [用于数学、科学和工程的希腊字母](https://zh.wikipedia.org/zh-cn/%E7%94%A8%E6%96%BC%E6%95%B8%E5%AD%B8%E3%80%81%E7%A7%91%E5%AD%B8%E5%92%8C%E5%B7%A5%E7%A8%8B%E7%9A%84%E5%B8%8C%E8%87%98%E5%AD%97%E6%AF%8D)
* 第一个字母大小写的不同，结果不同


具体的数学公式写法可以参考以下链接

* <https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference>
* <https://www.mathjax.org/>
* <https://en.wikipedia.org/wiki/Greek_alphabet#Letter_names>
* <http://www.rapidtables.com/math/symbols/greek_alphabet.htm>


另外，如果看到了一个公式，不知道怎么写的话，可以右键该公式，具体操作如下图

{% asset_img "1.png" "" %}

{% asset_img "2.png" "" %}

{% asset_img "3.png" "" %}
