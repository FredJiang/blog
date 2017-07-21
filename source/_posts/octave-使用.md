---
title: octave 使用
date: 2017-07-18 16:20:25
tags: [machine learning, octave, gnuplot]
---


[安装步骤](https://wiki.octave.org/Octave_for_MacOS_X)

<!--more-->

```
xcode-select --install
```

安装 [XQuartz](https://www.xquartz.org/)

安装 [Aquaterm](https://sourceforge.net/projects/aquaterm/)

```
brew tap homebrew/science
brew update
brew upgrade
brew install octave
```

使用

{% asset_img "octave.png" "" %}


```
x = [0:0.01:1];
y = sin(2*pi*x);
plot(x,y);
```






在使用过程中，如果报这个错

> No output will be generated. Please select a terminal with 'set terminal'

在 mac 上，可以这样处理

```
brew uninstall gnuplot
brew install gnuplot --with-x11
echo "setenv('GNUTERM','X11')" >> ~/.octaverc
```