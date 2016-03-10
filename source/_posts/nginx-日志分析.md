title: nginx 日志分析
date: 2015-03-10 15:27:39
tags: [nginx, log, goaccess]
---

### 安装 goaccess

我的机器为 ubuntu，用 sudo apt-get install goaccess 安装后，使用时报错 Unknown option `--'.

命令

goaccess --version

依然报错 Unknown option `--'.

后参考官网编译安装成功 <http://goaccess.io/download>

```
$ wget http://tar.goaccess.io/goaccess-0.8.5.tar.gz
$ tar -xzvf goaccess-0.8.5.tar.gz
$ cd goaccess-0.8.5/
$ sudo apt-get install libncursesw5-dev libglib2.0-dev libgeoip-dev
$ ./configure --enable-geoip --enable-utf8
$ make
# make install
```


### 修改 nginx 日志的归档文件名格式

配置文件为：/etc/logrotate.d/nginx

文件内容为：

```
/var/log/nginx/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 0644 www-data adm 
    dateext
    dateformat -%Y%m%d
    sharedscripts
    prerotate
        if [ -d /etc/logrotate.d/httpd-prerotate ]; then \
            run-parts /etc/logrotate.d/httpd-prerotate; \
        fi; \
    endscript
    postrotate
        [ ! -f /var/run/nginx.pid ] || kill -USR1 `cat /var/run/nginx.pid`
    endscript
}
```

添加内容

> dateext
> 
> dateformat -%Y%m%d

### 修改 nginx log format

配置文件为：/etc/nginx/nginx.conf

添加内容：

		##
		# Logging Settings
		##
		log_format compression '$remote_addr - $remote_user [$time_local] '
		                       '"$request" $status $bytes_sent '
		                       '"$http_referer" "$http_user_agent" "$gzip_ratio "$request_time"';
		access_log /var/log/nginx/access.log compression;
		
	#	access_log /var/log/nginx/access.log;

### 重启 nginx

```
sudo service nginx restart
```

### python 脚本

新建文件 sendMail.py

```
touch sendMail.py
chmod +x sendMail.py
```

sendMail.py 文件内容

	#!/usr/bin/python
	#coding:utf-8
	import sys
	import time
	import datetime
	import os
	import subprocess
	import smtplib
	from email.mime.text import MIMEText
	
	############################################################
	# 配置
	mailProxy = "smtp.gmail.com"
	mailProxyPort = 587
	
	mailAccountUsername = ''
	mailAccountUserPassword = ''
	
	mailSubject = ""
	mailFrom = ''
	mailTo = 'mail1;mail2'
	############################################################
	
	
	def generateReport():
	    print("generateReport")
	    print(datetime.datetime.now())
	
	    global hasSend
	
	    delta = datetime.timedelta(1)
	    yesterday = datetime.date.today() - delta
	    accessLogFileGZ = r'/var/log/nginx/access.log-' + yesterday.strftime('%Y%m%d') + '.gz'
	    reportSaveFileHtml = r'' + os.getcwd() + "/" + yesterday.strftime('%Y%m%d') + '.html'
	
	    print("accessLogFileGZ " + accessLogFileGZ)
	    print("reportSaveFileHtml " + reportSaveFileHtml)
	
	    if os.path.isfile(accessLogFileGZ) and (not os.path.isfile(reportSaveFileHtml)):
	        cmd = r'zcat -f ' + accessLogFileGZ + r' | goaccess --date-format="%d/%b/%Y" --log-format="%h - %^ [%d:%^] \"%r\" %s %b \"%R\" \"%u\" \"%^ \"%T\"" > ' + reportSaveFileHtml
	        print("cmd " + cmd)
	        subprocess.call(cmd, shell=True)
	        hasSend = False
	    else:
	        print("os.path.isfile(accessLogFileGZ) and (not os.path.isfile(reportSaveFileHtml) false")
	        hasSend = True
	   
	def sendMail():
	    print("sendMail")
	    print(datetime.datetime.now())
	
	    global hasSend
	
	    delta = datetime.timedelta(1)
	    yesterday = datetime.date.today() - delta
	    reportSaveFileHtml = r'' + os.getcwd() + "/" + yesterday.strftime('%Y%m%d') + '.html'
	
	    print("reportSaveFileHtml " + reportSaveFileHtml)
	
	    if os.path.isfile(reportSaveFileHtml):
	        f = open(reportSaveFileHtml)
	        content = f.read()
	        f.close()
	
	        msg = MIMEText(content, 'html', 'utf-8')
	        msg['Subject'] = mailSubject + "(" + yesterday.strftime('%Y%m%d') + ")"
	        msg['From'] =  mailFrom
	        msg['To'] = mailTo
	
	        try:
	            s = smtplib.SMTP()
	            s.connect(mailProxy, mailProxyPort)
	            s.ehlo()
	            s.starttls()
	            s.login(mailAccountUsername, mailAccountUserPassword)
	            s.sendmail(mailFrom, mailTo.split(';'), msg.as_string())
	            s.close()
	            hasSend = True
	        except Exception, e:
	            hasSend = False
	            print str(e)
	
	hasSend = False
	interval = 10 * 60
	
	while True:
	    generateReport()
	   
	    if not hasSend:
	        print("")
	        sendMail()
	
	    print("")
	    print("hasSend", hasSend)
		sys.stdout.flush()
	    time.sleep(interval)


### 启动脚本

python定时生成报告及发邮件，使用 nohup 放入后台运行

```
nohup python sendmail.py >/dev/null 2>&1 &
```

或

```
nohup python sendmail.py &
```

### 获取机器名字

```
import platform
hostname = platform.node()
print(hostname)
```