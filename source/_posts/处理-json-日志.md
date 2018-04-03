---
title: 处理 json 日志
date: 2017-11-14 01:00:46
tags: [json, awk, jq]
---

{% asset_img "1.png" "" %}

<!--more-->

```
 Fred  ~  Downloads  cat time_eclipsed.log
{"winston_timestamp": "2017-11-13 06:56:03", "winston_level": "api_time_usage", "stackInfo": "routes/index.js:148", "time_eclipsed":10}
{"winston_timestamp": "2017-11-13 02:01:33", "winston_level": "api_time_usage", "stackInfo": "routes/index.js:148", "time_eclipsed":1}
{"winston_timestamp": "2017-11-13 02:15:30", "winston_level": "api_time_usage", "stackInfo": "routes/index.js:148", "time_eclipsed":2}
{"winston_timestamp": "2017-11-13 03:09:58", "winston_level": "api_time_usage", "stackInfo": "routes/index.js:148", "time_eclipsed":3}
{"winston_timestamp": "2017-11-13 03:10:00", "winston_level": "api_time_usage", "stackInfo": "routes/index.js:148", "time_eclipsed":9}
{"winston_timestamp": "2017-11-13 03:35:35", "winston_level": "api_time_usage", "stackInfo": "routes/index.js:148", "time_eclipsed":8}
{"winston_timestamp": "2017-11-13 03:50:36", "winston_level": "api_time_usage", "stackInfo": "routes/index.js:148", "time_eclipsed":7}
{"winston_timestamp": "2017-11-13 03:50:38", "winston_level": "api_time_usage", "stackInfo": "routes/index.js:148", "time_eclipsed":6}
{"winston_timestamp": "2017-11-13 06:32:33", "winston_level": "api_time_usage", "stackInfo": "routes/index.js:148", "time_eclipsed":5}
{"winston_timestamp": "2017-11-13 06:32:35", "winston_level": "api_time_usage", "stackInfo": "routes/index.js:148", "time_eclipsed":4}
 Fred  ~  Downloads  cat time_eclipsed.log | \
\
awk '\
BEGIN \
{\
  preLine=""; \
  print "["; \
}\
{\
  if (length(preLine) != 0) { \
    print preLine,",";\
  } \
  preLine=$0;\
}\
END \
{\
  print preLine;\
  print "]"; \
}' | \
\
jq 'sort_by(.time_eclipsed)' | \
jq -c '(.[] | { winston_timestamp: .winston_timestamp, time_eclipsed: .time_eclipsed })'
{"winston_timestamp":"2017-11-13 02:01:33","time_eclipsed":1}
{"winston_timestamp":"2017-11-13 02:15:30","time_eclipsed":2}
{"winston_timestamp":"2017-11-13 03:09:58","time_eclipsed":3}
{"winston_timestamp":"2017-11-13 06:32:35","time_eclipsed":4}
{"winston_timestamp":"2017-11-13 06:32:33","time_eclipsed":5}
{"winston_timestamp":"2017-11-13 03:50:38","time_eclipsed":6}
{"winston_timestamp":"2017-11-13 03:50:36","time_eclipsed":7}
{"winston_timestamp":"2017-11-13 03:35:35","time_eclipsed":8}
{"winston_timestamp":"2017-11-13 03:10:00","time_eclipsed":9}
{"winston_timestamp":"2017-11-13 06:56:03","time_eclipsed":10}
```
