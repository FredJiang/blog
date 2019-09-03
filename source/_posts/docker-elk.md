---
title: docker elk
date: 2019-07-01 09:47:33
tags: [docker, elk, elasticsearch, kibana, logstash, filebeat]
---

* <https://hub.docker.com/_/elasticsearch>
* <https://hub.docker.com/_/kibana>
* <https://hub.docker.com/_/logstash>

<!--more-->

```shell
docker pull elasticsearch:7.2.0 && \
docker pull kibana:7.2.0 && \
docker pull logstash:7.2.0

docker pull docker.elastic.co/beats/filebeat:7.2.0
```


elasticsearch

* <https://www.elastic.co/guide/en/elasticsearch/reference/7.2/docker.html>

```shell
mkdir -p     /data/elk/data/elasticsearch/usr/share/elasticsearch/data/
chmod -R 777 /data/elk/data/elasticsearch/usr/share/elasticsearch/data/
           # /data/elk/data/elasticsearch/usr/share/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml

docker \
run \
--restart always \
--name xl_elasticsearch_7.2.0 \
-e "discovery.type=single-node" \
-e "DISCOVERY_TYPE=single-node" \
-p 9200:9200 \
-p 9300:9300 \
-v /data/elk/data/elasticsearch/usr/share/elasticsearch/data/:/usr/share/elasticsearch/data/ \
-d \
elasticsearch:7.2.0

curl http://10.2.44.32:9200/_cat/health
```


kibana

* <https://www.elastic.co/guide/en/kibana/7.2/docker.html>

```shell
docker \
run \
-e "elasticsearch.hosts=http://10.2.44.32:9200" \
-e "ELASTICSEARCH_HOSTS=http://10.2.44.32:9200" \
--restart always \
--name xl_kibana_7.2.0 \
-p 5601:5601 \
-d \
kibana:7.2.0

http://10.2.44.32:5601
```

logstash

* <https://www.elastic.co/guide/en/logstash/7.2/docker.html>



filebeat

* <https://www.elastic.co/guide/en/beats/filebeat/7.2/directory-layout.html>
* <https://www.elastic.co/guide/en/beats/filebeat/7.2/filebeat-configuration.html>


filebeat.yml

```
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /data/logs/xl/*.log

output.elasticsearch:
  hosts: ["10.2.44.32:9200"]
```


docker

* <https://www.elastic.co/guide/en/beats/filebeat/7.2/running-on-docker.html>

```shell
mkdir -p     /data/elk/data/filebeat/usr/share/filebeat/
mkdir -p     /data/elk/data/filebeat/usr/share/filebeat/data/
mkdir -p     /data/elk/data/filebeat/usr/share/filebeat/logs/
chmod -R 777 /data/elk/data/filebeat/usr/share/filebeat/

cd           /data/elk/data/filebeat/usr/share/filebeat/
curl -L -O   "https://raw.githubusercontent.com/elastic/beats/v7.2.0/filebeat/filebeat.yml"

docker \
run \
--restart always \
--name xl_filebeat_7.2.0 \
-v /data/elk/data/filebeat/usr/share/filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml \
-v /data/elk/data/filebeat/usr/share/filebeat/data/:/usr/share/filebeat/data/ \
-v /data/elk/data/filebeat/usr/share/filebeat/logs/:/usr/share/filebeat/logs/ \
-d \
docker.elastic.co/beats/filebeat:7.2.0
```

shell

* <https://www.elastic.co/guide/en/beats/filebeat/7.2/filebeat-installation.html>
* <https://www.elastic.co/guide/en/beats/filebeat/7.2/filebeat-starting.html>

```shell
mkdir -p     /data/elk/software/
chmod -R 777 /data/elk/software/
cd           /data/elk/software/
curl -L -O "https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.2.0-linux-x86_64.tar.gz"
tar xzvf filebeat-7.2.0-linux-x86_64.tar.gz

cd      /data/elk/software/filebeat-7.2.0-linux-x86_64 && \
sudo   ./filebeat -e -c filebeat.yml
```

