---
title: css 布局
date: 2018-09-06 10:35:10
tags: [css, html, layout]
---

* <http://learnlayout.com/>


* [盒状模型](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)
* [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
* [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
* [float](https://developer.mozilla.org/en-US/docs/Web/CSS/float)
* [flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)
* [垂直居中](https://css-tricks.com/centering-css-complete-guide/)

<!--more-->

文字垂直居中

```html
<!DOCTYPE html>
<html>

<head>
  <title>css test</title>
  <style type="text/css">
  #divSingleLine {
    height: 100px;
    width: 300px;
    /* div 自己居中*/
    margin: 50px auto;
    border: 1px solid red;
    /* 设置 line-height 与父级元素的 height 相等 */
    line-height: 100px;
  }

  #outer {
    height: 200px;
    width: 400px;
    /* div 自己居中*/
    margin: 50px auto;
    border: 1px solid red;
    display: table;
  }

  #middle {
    display: table-cell;
    vertical-align: middle;
    width: 100%;
  }

  </style>
</head>

<body>
  <div id="divSingleLine">
    这是单行文本垂直居中
  </div>
  <div id="outer">
    <div id="middle">
      这是固定高度多行文本垂直居中，这是固定高度多行文本垂直居中，这是固定高度多行文本垂直居中，这是固定高度多行文本垂直居中。
    </div>
  </div>
</body>

</html>

```

relative 移动元素，但是依然占用原来流中的位置

```html
<style type="text/css">
div {
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
}

</style>
<div style="background: blue">A</div>
<div style="background: red; position: relative; top: 20px; left: 20px;">B</div>
<div style="background: green">C</div>

```


* 块状元素在 position(relative/static) 的情况下 width 为 100%，但是设置了 position: absolute 之后，会将 width 变成 auto（会受到父元素的宽度影响）
* position: absolute 忽略根元素的 padding
* position: absolute 元素的位置是相对于距离他最近的非 static 祖先元素位置决定的

```html
<span style="position: absolute; width: 100px; height: 150px; top: 10px; left: 10px; background: red;">
  position: absolute 将 display 属性由 inline 变成了 block，可以设置宽和高
</span>
<span style="position: relative; width: 100px; height: 150px; top: 200px; left: 10px; background: green;">
  position: relative 不可以
</span>
```


position: fixed

* 改变行内元素的呈现模式，使 display 变更为 block
* 元素脱离普通流，不占据空间
* fixed 与 absolute 最大的区别在于：absolute 的根元素是可以被设置的，而 fixed 的根元素固定为浏览器窗口。即当你滚动网页，其元素与浏览器窗口之间的距离是恒定不变的。 





display: none; 让元素脱离文档流，不显示，不占文档空间

```html
<style type="text/css">
div {
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
}

</style>
<div style="background: blue">A</div>
<div style="background: red; display: none;">B</div>
<div style="background: green">C</div>
```

float 属性

* 当元素应用了 float 属性后，将会脱离普通流，其容器（父）元素将得不到脱离普通流的子元素高度
* 将元素的 display 属性变更为 block
* 浮动元素的后一个元素会围绕着浮动元素（典型运用是文字围绕图片）






