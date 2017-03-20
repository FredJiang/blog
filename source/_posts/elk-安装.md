---
title: elk 安装
date: 2017-03-14 10:30:01
tags: [elk]
---


* [参考](#参考)
* [环境](#环境)
* [安装 java（1.8）](#安装-java（1.8）)
* [安装 elasticsearch](#安装-elasticsearch)
* [安装 Kibana](#安装-Kibana)
* [配置 Nginx](#配置-Nginx)
* [安装 Logstash](#安装-Logstash)
* [安装 Filebeat](#安装-Filebeat)
* [查看结果](#查看结果)
* [注意](#注意)


<!--more-->

### 参考

* <https://www.ibm.com/developerworks/cn/opensource/os-cn-elk/>
* <https://www.elastic.co/products>

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
```

验证 elasticsearch

`curl "http://192.168.200.10:9200"`




### 安装 Kibana

* <https://www.elastic.co/downloads/kibana>


```
wget "https://artifacts.elastic.co/downloads/kibana/kibana-5.2.2-linux-x86_64.tar.gz"
tar xzvf kibana-5.2.2-linux-x86_64.tar.gz
cd kibana-5.2.2-linux-x86_64
vim config/kibana.ym
```

`#server.host: "localhost"` 替换为 `server.host: "192.168.200.10"`

`#elasticsearch.url: "http://localhost:9200"` 替换为 `elasticsearch.url: "http://192.168.200.10:9200"`


启动 Kibana

`./bin/kibana`

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


### 中文文档

* <https://kibana.logstash.es/content/>
* <https://www.gitbook.com/book/chenryn/elk-stack-guide-cn>