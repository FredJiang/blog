---
title: linux 批量创建用户
date: 2017-07-07 23:54:07
tags: [linux, shell, useradd]
---


首先来一个删除用户的命令，毕竟代码是要测试的，所以删除测试时添加的用户是有必要的

`sudo userdel -r usera ; sudo userdel -r userb`

<!--more-->


先来一个最直接的方式，准给好命令，然后 ssh 登录到服务器上，直接执行命令，例如如下命令

```
sudo useradd -m -s /bin/bash usera && \
sudo echo -e 'password\npassword' | sudo passwd usera && \
sudo mkdir /home/usera/.ssh && \
sudo chmod 700 /home/usera/.ssh && \
sudo touch /home/usera/.ssh/authorized_keys && \
sudo chmod 600 /home/usera/.ssh/authorized_keys && \
sudo chown usera:usera -R /home/usera/.ssh/ && \
\
sudo useradd -m -s /bin/bash userb && \
sudo echo -e 'password\npassword' | sudo passwd userb && \
sudo mkdir /home/userb/.ssh && \
sudo chmod 700 /home/userb/.ssh && \
sudo touch /home/userb/.ssh/authorized_keys && \
sudo chmod 600 /home/userb/.ssh/authorized_keys && \
sudo chown userb:userb -R /home/userb/.ssh/ && \
\
sudo bash -c "echo 'ssh-rsa AAAAB3XXX Fred@Fred.local'   > /home/usera/.ssh/authorized_keys"  && \
sudo bash -c "echo 'ssh-rsa AAAAB3XXX Fred@Fred.local'   > /home/userb/.ssh/authorized_keys"
```







再来一种将准备好的用户数据放到一个文件中的方式


准备用户数据

userlist.txt

```
usera:1x2345!@#$%abc:ssh-rsa AXXXXT Fred@Fred.local
userb:1x2345!@#$%abc
fred:1x2345!@#$%abc
```

以上数据每一行为一个用户，每一行的具体含义如下

username:password:id_rsa.pub

注意，我这用的 `:` 做分隔符，所以用户名和密码是不能有 `:` 的，


add.sh

```
#!/bin/sh

while read userInfo;
do
    IFS=':' read -r username password pubKey <<< "$userInfo"
    echo ''
    echo "username $username"
    echo "password $password"
    echo "pubKey $pubKey"

    if id -u $username > /dev/null 2>&1; then
        echo user $username has exist
    else
        echo "add user $username"
        sudo useradd -m -s /bin/bash $username
        sudo echo -e "$password\n$password" | sudo passwd $username
        sudo mkdir /home/$username/.ssh
        sudo chmod 700 /home/$username/.ssh
        sudo touch /home/$username/.ssh/authorized_keys
        sudo chmod 600 /home/$username/.ssh/authorized_keys
        sudo bash -c "echo $pubKey > /home/$username/.ssh/authorized_keys"
    fi
done < "$1"
```

在远端机器上运行

`./add.sh userlist.txt`





以上命令直接在远端机器上运行是没问题的，不过要通过 ssh 在远端机器上运行是有问题的

如下所示

 
```
➜   cat add.sh
#!/bin/sh

while read userInfo;
do
    IFS=':' read -r username password pubKey <<< "$userInfo"
    echo ''
    echo "username $username"
    echo "password $password"
    echo "pubKey $pubKey"

    if id -u $username > /dev/null 2>&1; then
        echo user $username has exist
    else
        echo "add user $username"
    fi
done < "$1"
➜   ssh fred@host "bash -s -- '$(cat userlist.txt)'" < add.sh
bash: line 16: usera:1x2345!@#$%abc:ssh-rsa AXXXXT Fred@Fred.local
userb:1x2345!@#$%abc
fred:1x2345!@#$%abc: No such file or directory
```


注意以下 `done <<< $1` 这一句

```
➜   cat add.sh
#!/bin/sh

while read userInfo;
do
    IFS=':' read -r username password pubKey <<< "$userInfo"
    echo ''
    echo "username $username"
    echo "password $password"
    echo "pubKey $pubKey"

    if id -u $username > /dev/null 2>&1; then
        echo user $username has exist
    else
        echo "add user $username"
    fi
done <<< $1
➜   ssh fred@host "bash -s -- '$(cat userlist.txt)'" < add.sh

username usera
password 1x2345!@#$%abc
pubKey ssh-rsa AXXXXT Fred@Fred.local userb:1x2345!@#$%abc fred:1x2345!@#$%abc
add user usera
➜  
```

注意以下 `done <<< "$1"` 这一句


```
➜   cat add.sh
#!/bin/sh

while read userInfo;
do
    IFS=':' read -r username password pubKey <<< "$userInfo"
    echo ''
    echo "username $username"
    echo "password $password"
    echo "pubKey $pubKey"

    if id -u $username > /dev/null 2>&1; then
        echo user $username has exist
    else
        echo "add user $username"
    fi
done <<< "$1"
➜   ssh fred@host "bash -s -- '$(cat userlist.txt)'" < add.sh

username usera
password 1x2345!@#$%abc
pubKey ssh-rsa AXXXXT Fred@Fred.local
add user usera

username userb
password 1x2345!@#$%abc
pubKey
add user userb

username fred
password 1x2345!@#$%abc
pubKey
user fred has exist
```

最后加上添加用户的命令，本来以为好了，然而，报了如下错误


> sudo: sorry, you must have a tty to run sudo

可以这样，不过修改密码还是有点问题

```
#!/bin/sh

sudoUser=$2
sudoHost=$3
sudoPassword=$4
g_myExecResult=""

function myExec() {
   # < /dev/null  是为了不影响 while read userInfo;
   # 2> /dev/null 是为了过滤   Connection to host closed.
   myExecCommand="sshpass -p $sudoPassword ssh -tt $sudoUser@$sudoHost \"echo $sudoPassword | sudo -S $@;\" < /dev/null 2> /dev/null"
   echo '>>>>>>' $myExecCommand
   myExecResult=$(eval $myExecCommand)
   echo myExecResult $myExecResult
   g_myExecResult=`echo $myExecResult | sed "s/\[sudo\] password for $sudoUser: //g"`
   echo g_myExecResult $g_myExecResult
}

while read userInfo;
do
    IFS=':' read -r username password pubKey <<< "$userInfo"
    echo ''
    echo "username $username"
    echo "password $password"
    echo "pubKey $pubKey"

    myExec id -u $username

    if [[ $g_myExecResult = *[[:digit:]]* ]]; then
        echo "user $username has exist"
    else
        echo "add user $username"
        myExec useradd -m -s /bin/bash $username

        # trueCommand="echo \"echo $password | sudo passwd $username --stdin\" | sudo bash"
        # sshCommand="sshpass -p $sudoPassword ssh -tt $sudoUser@$sudoHost '$trueCommand' < /dev/null 2> /dev/null"
        # echo '>>>>>>' $sshCommand
        # eval $sshCommand < /dev/null 2> /dev/null

        myExec mkdir /home/$username/.ssh
        myExec chmod 700 /home/$username/.ssh
        myExec touch /home/$username/.ssh/authorized_keys
        myExec chmod 600 /home/$username/.ssh/authorized_keys

        trueCommand="echo $sudoPassword | sudo -S su root -c \"echo \\\"echo $pubKey > /home/$username/.ssh/authorized_keys\\\" | sudo bash\""
        sshCommand="sshpass -p $sudoPassword ssh -tt $sudoUser@$sudoHost '$trueCommand' < /dev/null 2> /dev/null"
        echo '>>>>>>' $sshCommand
        eval $sshCommand < /dev/null 2> /dev/null
    fi
    echo ''
done < "$1"

```

这样运行代码

`./add.sh userlist.txt user host password`


* <https://stackoverflow.com/questions/20254906/bash-script-to-ssh-multiple-servers-in-a-loop-and-issue-commands>
* <https://www.pantz.org/software/shell/echo_lines_into_a_root_owned_file_with_sudo.html>



好麻烦呀，后面可以查下怎么直接在 useradd 明命令里面直接指定密码，或者直接用 [ansible](https://www.ansible.com/)

