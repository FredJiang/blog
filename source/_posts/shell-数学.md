---
title: shell 数学
date: 2016-12-29 20:23:35
tags: [shell, bash, math]
---

The Bash shell environment can perform basic arithmetic operations using the commands let, (( )), and []. The two utilities expr and bc are also very helpful in performing advanced operations.

<!--more-->

```
no1=4;no2=5;

let result=no1+no2echo $result

result=$[ no1 + no2 ]
echo $result

result=$[ $no1 + 5 ]
echo $result

result=$(( no1 + 50 ))
echo $result

result=`expr 3 + 4`
echo $result

result=$(expr $no1 + 5)
echo $result

```

```
let no1++
let no1--
let no+=6
let no-=6
let no=no+6
let no=no-6
```

bc, the precision calculator is an advanced utility for mathematical operations. 

```
echo "4 * 0.56" | bc

no=54;result=`echo "$no * 1.5" | bc`echo $result
```

Additional parameters can be passed to bc semicolon as delimiters through stdin.

In the following example the scale=2 parameter sets the number of decimal places to 2.

```
echo "scale=2;3/8" | bc
echo "sqrt(100)" | bc
echo "10^10" | bc
```

* 进制转换

```
no=100echo "obase=2;$no" | bc

no=1100100echo "obase=10;ibase=2;$no" | bc
```