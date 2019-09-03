---
title: elk 安装
date: 2017-03-14 10:30:01
tags: [elk, elasticsearch, kibana, logstash, filebeat]
---

* [参考](#参考)
* [环境](#环境)
* [安装 java（1.8）](#安装-java（1-8）)
* [安装 elasticsearch](#安装-elasticsearch)
* [安装 Kibana](#安装-Kibana)
* [配置 Nginx](#配置-Nginx)
* [安装 Logstash](#安装-Logstash)
* [安装 Filebeat](#安装-Filebeat)
* [查看结果](#查看结果)
* [测试](#测试)
* [注意](#注意)
* [其他](#其他)

<!--more-->

### 参考

* <https://www.ibm.com/developerworks/cn/opensource/os-cn-elk/>
* <https://www.elastic.co/products>
* <http://www.lilaiqun.com/2018/05/03/20180503/>

### 环境

* 操作系统：CentOS release 6.8 (Final)

### 安装 java（1.8）


```
sudo yum update
sudo yum install java-1.8.0-openjdk

java -version
# openjdk version "1.8.0_121"
# OpenJDK Runtime Environment (build 1.8.0_121-b13)
# OpenJDK 64-Bit Server VM (build 25.121-b13, mixed mode)
```


### 安装 elasticsearch

* <https://www.elastic.co/downloads/elasticsearch>
* <https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html>

```
cd /export/elk/
wget "https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.2.2.tar.gz"
tar xzvf elasticsearch-5.2.2.tar.gz
cd elasticsearch-5.2.2
vim config/elasticsearch.yml
```

`#network.host:` 替换为 `network.host: localhost`

添加 `http.host: 192.168.200.10`

启动 elasticsearch

```
./bin/elasticsearch

./bin/elasticsearch -d
```

验证 elasticsearch

`curl "http://192.168.200.10:9200"`

其他命令

|     作用     |                                                             curl                                                             |              kibana              |                                        文档                                        |
|--------------|------------------------------------------------------------------------------------------------------------------------------|----------------------------------|------------------------------------------------------------------------------------|
| 列出所有索引 | `curl -X GET    "http://192.168.200.10:9200/_cat/indices?v&s=index"`                                                         | `GET    /_cat/indices?v&s=index` | <https://www.elastic.co/guide/en/elasticsearch/reference/current/cat-indices.html> |
| 删除索引     | `curl -X DELETE "http://192.168.200.10:9200/logstash-2017.03*?pretty"`                                                       | `DELETE /*-2017.03*?pretty`      |                                                                                    |
| 显示 mapping | `curl -X GET    "http://192.168.200.10:9200/logstash-2018.07.17/_mapping?pretty"`                                            |                                  |                                                                                    |
| 显示索引信息 | `curl -X GET    "http://192.168.200.10:9200/logstash-2018.11.07/_settings?pretty"`                                           |                                  |                                                                                    |
| 设置索引     | `curl -X PUT    "http://192.168.200.10:9200/logstash-2018.07.17/_settings" -d '{"index.mapping.total_fields.limit": 10000}'` |                                  |                                                                                    |


提前创建索引

```
curl -X GET    "http://192.168.200.10:9200/_cat/indices?v&s=index"
curl -X PUT    "http://192.168.200.10:9200/logstash-2018.07.21" -d '{"index.mapping.total_fields.limit": 10000}'
curl -X GET    "http://192.168.200.10:9200/logstash-2018.07.21/_settings?pretty"
```

在 kibana 上修改索引

```
PUT logstash-2018.07.20/_settings
{
  "index.mapping.total_fields.limit": 10000
}
```


提前创建索引脚本

`curl -X GET    "http://192.168.200.10:9200/_cat/indices?v&s=index" 2>&1 | tail`

```
for index in {2..300}
do
   logstashDate=`date --date="+$index day" +"%Y.%m.%d"`
   echo "$index $logstashDate"
   curl -X PUT    "http://192.168.200.10:9200/logstash-$logstashDate" -d '{"index.mapping.total_fields.limit": 10000}'
   echo ""
done
```


### 安装 Kibana

* <https://www.elastic.co/downloads/kibana>


```
cd /export/elk/
wget "https://artifacts.elastic.co/downloads/kibana/kibana-5.2.2-linux-x86_64.tar.gz"
tar xzvf kibana-5.2.2-linux-x86_64.tar.gz
cd kibana-5.2.2-linux-x86_64
vim config/kibana.yml
```

`#server.host: "localhost"` 替换为 `server.host: "192.168.200.10"`

`#elasticsearch.url: "http://localhost:9200"` 替换为 `elasticsearch.url: "http://192.168.200.10:9200"`


启动 Kibana

```
./bin/kibana

nohup ./bin/kibana &

nohup ./bin/kibana >/dev/null 2>&1 &
```

验证 Kibana

`curl "http://192.168.200.10:5601/"`


### 配置 Nginx

```
server {
    listen 81;
    server_name elk.xxx.com;

    location / {
        proxy_pass          http://192.168.200.10:5601;
        proxy_http_version  1.1;
        proxy_set_header    Upgrade     $http_upgrade;
        proxy_set_header    Connection  'upgrade';
        proxy_set_header    host        $host;
        proxy_cache_bypass  $http_upgrade;
    }
}
```

### 安装 Logstash

* <https://www.elastic.co/downloads/logstash>

```
cd /export/elk/
wget "https://artifacts.elastic.co/downloads/logstash/logstash-5.2.2.tar.gz"
tar xzvf logstash-5.2.2.tar.gz
cd logstash-5.2.2
```

验证 Logstash

`./bin/logstash -e 'input { stdin { } } output { stdout {} }'`


配置 Logstash

```
mkdir conf
vim ./conf/simple.conf
```

单独使用 Logstash

```
input {
  file {
    type => "nodejs"
    #format => json
    path => [
      "/export/nodejs/logs/sdk_tw_sdk3.0_7001_out.log",
      "/export/nodejs/logs/order_tw_sdk_all_4000_out.log",
      "/export/nodejs/logs/activity_tw_sdk_all_5999_out.log",
      "/export/nodejs/logs/messageplatform_tw_8001_out.log",
      "/export/nodejs/logs/latexappcms_tw_8011_out.log",
      "/export/nodejs/logs/latexappcms_tw_8012_out.log"
    ]
  }
  file {
    type => "nodejs_err"
    #format => json
    path => [
      "/export/nodejs/logs/sdk_tw_sdk3.0_7001_err.log",
      "/export/nodejs/logs/order_tw_sdk_all_4000_err.log",
      "/export/nodejs/logs/activity_tw_sdk_all_5999_err.log",
      "/export/nodejs/logs/messageplatform_tw_8001_err.log",
      "/export/nodejs/logs/latexappcms_tw_8011_err.log",
      "/export/nodejs/logs/latexappcms_tw_8012_err.log"
    ]
  }
}

filter {
  if [type] == "nodejs" {
    json {
      source => "message"
      target => "nodejs"
      #remove_field => ["message"]
    }
  }
  if [type] == "nodejs_err" {
    json {
      source => "message"
      target => "nodejs"
      #remove_field => ["message"]
    }
  }
}

output {
  elasticsearch { hosts => ["192.168.200.10:9200"] }
  stdout { codec => rubydebug }
}
```

配合 Filebeat 使用

```
input {
  beats {
    port => "5044"
    type => "logs"
    ssl => false
  } 
}
filter {
  grok {
    match => { "message" => "%{COMBINEDAPACHELOG}" }
  }
  date {
    match => [ "timestamp" , "dd/MMM/yyyy:HH:mm:ss Z" ]
  }
  json {
    source => "message"
  }
}
output {
  elasticsearch { hosts => ["192.168.200.10:9200"] }
  stdout { codec => rubydebug }
}
```


启动 Logstsh


`./bin/logstash -f ./conf/simple.conf`



### 安装 Filebeat

```
cd /export/elk/
wget "https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-5.2.2-linux-x86_64.tar.gz" && \
tar xzvf filebeat-5.2.2-linux-x86_64.tar.gz && \
cd filebeat-5.2.2-linux-x86_64
```


配置 filebeat.yml


```
- input_type: log
  paths:
    - /export/nodejs/logs/*err.log
    - /export/nodejs/logs/gameSDKServerAPI-all.log
    - /export/nodejs/BI/logs/DF_logs/*.log

output.elasticsearch:
  hosts: ["192.168.200.10:9200"]
  template.name: "filebeat"
  template.path: "filebeat.template.json"
  template.overwrite: false
  
output.logstash:
  hosts: ["192.168.200.10:5044"]
```


```
sudo ./filebeat -e -c filebeat.yml
```


### 查看结果

浏览器打开 http://elk.xxx.com

### 测试

```
while true; \
do \
echo '{"responseType":"error","code":0,"message":"服务器出错了","stackInfo":"2017-03-13 19:40:29 routes/order.js:456","winston_level":"error","winston_timestamp":"2017-03-13 19:40:29"}' >> /export/nodejs/logs/gameSDKServerAPI-all.log; \
date; \
sleep 5; \
done;
```


### 注意

以上配置没有使用 ssl 验证，这里以跑通为首要目标，暂时不考虑 ssl

### 其他

| Elasticsearch  |  MySQL   |
|----------------|----------|
| 索引 index     | database |
| 类型 type      | table    |
| 文档 document  | row      |
| 字段 field     | column   |
| 映射 mapping   | schema   |
| 查询语言 query | DSL SQL  |

