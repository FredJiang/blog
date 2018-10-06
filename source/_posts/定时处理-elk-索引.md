---
title: 定时处理 elk 索引
date: 2018-08-24 13:23:58
tags: [crontab, backup, disk]
---

```
0 1 * * * /home/jiangpeng/logDelete/elkIndex.sh > /home/jiangpeng/logDelete/elkIndex-$(date "+\%Y-\%m-\%d-\%H-\%M-\%S").log
```

<!--more-->

```bash
#!/bin/sh

logstashDate=`date --date="-3 day" +"%Y.%m.%d"`
echo "$index $logstashDate"
curl -X DELETE "http://192.168.200.10:9200/logstash-$logstashDate?pretty"
curl -X GET    "http://192.168.200.10:9200/_cat/indices?v&s=index"

logstashDate=`date --date="+1 day" +"%Y.%m.%d"`
echo "$index $logstashDate"
curl -X PUT    "http://192.168.200.10:9200/logstash-$logstashDate" -d '{"index.mapping.total_fields.limit": 10000}'
curl -X GET    "http://192.168.200.10:9200/_cat/indices?v&s=index"
```