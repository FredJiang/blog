---
title: mysql 导出数据
date: 2017-02-24 16:07:33
tags: [mysql, mysqldump]
---

* [SELECT INTO OUTFILE](#SELECT INTO OUTFILE)
* [mysqldump](#mysqldump)
* [mysql](#mysql)




### SELECT INTO OUTFILE

<!--more-->

```
SELECT * FROM users
INTO OUTFILE '/var/lib/mysql-files/sdk_new_game_users.csv'
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n';
```

如果报错

`ERROR 1290 (HY000): The MySQL server is running with the --secure-file-priv option so it cannot execute this statement`

则

```
SHOW VARIABLES LIKE "secure_file_priv";
+------------------+-----------------------+
| Variable_name    | Value                 |
+------------------+-----------------------+
| secure_file_priv | /var/lib/mysql-files/ |
+------------------+-----------------------+
```

把文件路径换成相应的 `secure_file_priv`

如果报错

`Access denied for user 'user_sdkgame'@'192.168.10.%' (using password: YES) when executing 'SELECT INTO OUTFILE'`

则

```
show grants for user_sdkgame;
+----------------------------------------------------------------+
| Grants for user_sdkgame@%                                      |
+----------------------------------------------------------------+
| GRANT USAGE ON *.* TO 'user_sdkgame'@'%'                       |
| GRANT ALL PRIVILEGES ON `sdk_new_game`.* TO 'user_sdkgame'@'%' |
+----------------------------------------------------------------+
```

* GRANT ALL does not imply GRANT FILE
* GRANT FILE only works with *.*


```
GRANT FILE ON *.* TO user_sdkgame;
+----------------------------------------------------------------+
| Grants for user_sdkgame@%                                      |
+----------------------------------------------------------------+
| GRANT FILE ON *.* TO 'user_sdkgame'@'%'                        |
| GRANT ALL PRIVILEGES ON `sdk_new_game`.* TO 'user_sdkgame'@'%' |
+----------------------------------------------------------------+
```


### mysqldump



```
mysqldump \
-u user_sdkgame \
-p \
--fields-terminated-by=',' \
--tab=/var/lib/mysql-files sdk_new_game users
```


### mysql

```
mysql \
-u user_sdkgame \
-pyoupassword \
sdk_new_game \
-Bse "select * from users;" \
| tr '\t' ',' \
> result.txt
```

或

```
mysql \
-u user_sdkgame \
-pyoupassword \
sdk_new_game \
-Bse "select * from users;" \
| sed 's/\t/,/g' \
> result.txt
```


