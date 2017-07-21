---
title: mongo 定时备份
date: 2017-07-05 23:44:38
tags: [mongo, crontab, backup]
---

`crontab -e`

添加如下内容，每隔 2 小时，执行一次

```
* */2 * * * /home/jiangpeng/bak_mongod.sh
```

<!--more-->

bak_mongod.sh


```
#!/bin/bash

# The script require the mongodump command.

# directories
BASE_DIR="/usr/"
BACK_DIR="/export/mongodbBackup/"
PRE_DIR=`date +%Y-%m-%d-%H-%M`
LOG_FILE="$BACK_DIR/logs/$PRE_DIR.log"
LOCK_FILE="/export/mongodbBackup/mongod.lock"

function ok {
   echo "ok $1" >> "$LOG_FILE"
}
function fail {
   echo "not ok $1" >> "$LOG_FILE"
}

if [ -f $LOCK_FILE ]
then
   PID=`cat $LOCK_FILE`
   if [ $PID -gt 0 ]
   then
      ok "XXXXXXX: `date`"
      msg=`$BASE_DIR/bin/mongodump --port 27017 -o $BACK_DIR/$PRE_DIR`
      ok "$msg"
      ok "backup mongod $PID ok."
   else
      fail "no pid in lock file."
   fi
else
  fail "can not find pid file"
fi

find "$BACK_DIR" -mindepth 1 -maxdepth 1 -type d -a -mtime 7 -exec rm -rf {} + && {
   ok "drop backups older than a week"
} || {
   fail "drop old backups failed with exit code $?"
}
```



`man find`

> -exec command ;

>>Execute  command;  true  if 0 status is returned.  All following arguments to find are taken to be arguments to the command until an argument con-
>>sisting of ‘;’ is encountered.  The string ‘{}’ is replaced by the current file name being processed everywhere it occurs in the arguments to  the
>>command,  not just in arguments where it is alone, as in some versions of find.  Both of these constructions might need to be escaped (with a ‘\’)
>>or quoted to protect them from expansion by the shell.  See the EXAMPLES section for examples of the use of the -exec option.  The specified  com-
>>mand  is run once for each matched file.  The command is executed in the starting directory.   There are unavoidable security problems surrounding
>>use of the -exec action; you should use the -execdir option instead.

> -exec command {} +

>> This variant of the -exec action runs the specified command on the selected files, but the command line is built by appending each  selected  file
>> name  at the end; the total number of invocations of the command will be much less than the number of matched files.  The command line is built in
>> much the same way that xargs builds its command lines.  Only one instance of ‘{}’ is allowed within the command.  The command is executed  in  the
>> starting directory.


> -maxdepth levels

>> Descend at most levels (a non-negative integer) levels of directories below the command line arguments.  -maxdepth 0
>> means only apply the tests and actions to the command line arguments.

> -mindepth levels
>> Do  not  apply  any  tests or actions at levels less than levels (a non-negative integer).  -mindepth 1 means process all files except the command
>> line arguments.


> -mtime n

>> File’s data was last modified n*24 hours ago.  See the comments for -atime to understand how rounding affects the interpretation of file modifica-
>> tion times.


