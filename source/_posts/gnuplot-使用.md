---
title: gnuplot 使用
date: 2017-07-05 11:16:15
tags: [plot, test, benchmark, gnuplot, octave]
---



data.bat 文件的内容如下

```
1499182465 013168358 2017-07-04 2.93
1499182470 009607850 2017-07-04 3.50
1499182475 004466495 2017-07-04 3.54
1499182480 004416899 2017-07-04 3.57
1499182485 003236168 2017-07-04 3.69
1499182490 004166305 2017-07-04 3.71
1499182500 004032325 2017-07-04 3.84
1499182505 016033252 2017-07-04 3.85
1499182510 005156705 2017-07-04 3.94
1499182515 004330904 2017-07-04 3.95
1499182520 003569855 2017-07-04 3.95
```

<!--more-->

首先安装 gnuplot


`brew install gnuplot`

或

`sudo yum install -y gnuplot`

或

`sudo apt-get install -y gnuplot`

具体操作步骤如下

{% asset_img "command.png" "" %}

最终结果如下

{% asset_img "data.png" "" %}


也可以将所有命令放到一个文件中，然后加载执行这个文件

data.gnu 的内容

```
set terminal png
set out 'data.png'
plot 'data.bat' using 4 w lines title 'QPS'
quit
```


然后运行

`gnuplot data.gnu`


其他

如果报错

> No output will be generated. Please select a terminal with 'set terminal'

则需要

`set terminal xxx`

具体有哪些 terminal，可以用如下命令

`set terminal`




`plot 'data.dat' using 1:2 title "x"`

> The use of the using 1:2 which makes gnuplot use column 1 for the data on the horizontal axis and column 2 for the data on the vertical axis.


`plot 'data.dat' using 1:3 title "y"  with lines`

> We plot the third column versus the first column of data and draw lines between the points.




参考

* <http://www.gnuplot.info>
* <http://physicspmb.ukzn.ac.za/index.php/Gnuplot_tutorial>
* <http://gnuplot.sourceforge.net/docs_4.2/node145.html>