---
title: mysql 数据收集
date: 2017-07-05 23:25:25
tags: [mysql, test, plot]
---


文件 collector.sh

<!--more-->

```
#!/bin/sh

INTERVAL=5
PREFIX=$INTERVAL-sec-status
BENCHMARKSDIR=~/mysqlCollector/benchmarks/
RUNFILE=$BENCHMARKSDIR
RUNFILE+="running"

echo PREFIX $PREFIX
echo BENCHMARKSDIR $BENCHMARKSDIR
echo RUNFILE $RUNFILE

if [ ! -d $BENCHMARKSDIR ]; then
    mkdir -p $BENCHMARKSDIR
else
    echo $BENCHMARKSDIR has exist.
fi

if [ ! -e $RUNFILE ]; then
    touch $RUNFILE
else
    echo $RUNFILE has exist.
fi

mysql -h 127.0.0.1 -u root -ppassword -e 'SHOW GLOBAL VARIABLES' >> mysql-variables
while test -e $RUNFILE; do
    file=$(date +%F_%I)
    echo file $file
    sleep=$(date +%s.%N | awk "{print $INTERVAL - (\$1 % $INTERVAL)}")
    echo sleep $sleep
    sleep $sleep
    ts="$(date +"TS %s. %N %F %T")"
    echo ts $ts
    loadavg="$(uptime)"
    echo loadavg $loadavg

    echo "$ts $loadavg" >> $PREFIX-${file}-status
    mysql -h 127.0.0.1 -u root -ppassword -e 'SHOW GLOBAL STATUS' >> $PREFIX-${file}-status &

    echo "$ts $loadavg" >> $PREFIX-${file}-innodbstatus
    mysql -h 127.0.0.1 -u root -ppassword -e'SHOW ENGINE INNODB STATUS\G' >> $PREFIX-${file}-innodbstatus &

    echo "$ts $loadavg" >> $PREFIX-${file}-processlist
    mysql -h 127.0.0.1 -u root -ppassword -e 'SHOW FULL PROCESSLIST\G' >> $PREFIX-${file}-processlist &

    echo $ts
done

echo Exiting because $RUNFILE does not exist.
```


文件 analyze.sh

```
#!/bin/sh

# This script converts SHOW GLOBAL STATUS into a tabulated format, one line
# per sample in the input, with the metrics divided by the time elapsed
# between samples.

awk '
  BEGIN {
    printf "#ts date time load QPS";
    fmt = " %.2f";
  }
  /^TS/ { # The timestamp lines begin with TS.
    ts      = substr($2, 1, index($2,".") - 1);
    load    = NF - 2;
    diff    = ts - prev_t;
    prev_ts = ts;
    printf "\n%s %s %s %s", ts, $3, $4, substr ($load, 1, length ($load)-1);
  }
  /Queries/ {
    printf fmt, ($2-Queries)/diff
    Queries = $2
  }
' "$@"
```

使用方式

收集数据

`collector.sh`

处理数据

`./analyze.sh 5-sec-status-2017-07-04_11-innodbstatus > data.bat`

数据图形化

[gnuplot 使用](../../../../2017/07/05/gnuplot-使用/)