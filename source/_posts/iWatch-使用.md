title: iWatch 使用
date: 2015-03-18 20:50:27
tags: [linux, log, iWatch]
---


### 安装 iwatch

```
sudo apt-get install iwatch
```

postfix 的配置选择

> Internet Site

### 配置 iwatch

配置文件为 /etc/iwatch/iwatch.xml

内容为

	<?xml version="1.0" ?>
	<!DOCTYPE config SYSTEM "/etc/iwatch/iwatch.dtd" >
	<config>
	  <guard email="root@localhost" name="IWatch"/>
	  <watchlist>
	    <title>报错了</title>
	    <contactpoint email="email1;email2" name=""/>
	    <path type="single" syslog="on" events="modify" filter="([\s\S]*)error([\s\S]*)log">/root/.pm2/logs</path>
	  </watchlist>
	</config>



或


```
<?xml version="1.0" ?>
<!DOCTYPE config SYSTEM "/etc/iwatch/iwatch.dtd" >
<config>
  <guard email="root@localhost" name="IWatch"/>
  <watchlist>
    <title>报错了</title>
    <contactpoint email="" name=""/>
    <path type="single" syslog="on" events="modify" filter="([\s\S]*)error([\s\S]*)(log$)" exec="if [ `cat %f | wc -l` -ne 0 ]; then cat %f | mail -s `hostname`' %f is accessed' 'email1,email2'; else echo no content to email; fi;">/root/.pm2/logs</path>
  </watchlist>
</config>
```

### 运行 iwatch

```
iwatch -f /etc/iwatch/iwatch.xml -v
```

### 测试

创建文件

```
touch /root/.pm2/logs/testerror.log
```

如果正常的话，就能收到邮件了

如果报错或者没收到邮件的话，可以查看 /var/log/mail.log 文件

我遇到了

> Jul  4 23:04:37 ubuntu postfix/smtpd[15269]: disconnect from unknown[192.168.1.150]


解决办法

在 /etc/postfix/main.cf 中的

```
mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128
```

后面添加 192.168.1.150

```
mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128 192.168.1.150
```


### 设置守护进程

将 /etc/default/iwatch 中的

```
START_DAEMON=false
```

改为

```
START_DAEMON=true
```

### 启动守护进程

```
sudo /etc/init.d/iwatch restart
```