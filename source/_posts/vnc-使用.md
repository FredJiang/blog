---
title: vnc 使用
date: 2017-03-14 07:59:46
tags: [vnc]
---

### ubuntu

安装 tightvncserver

`sudo apt-get install xfce4 xfce4-goodies tightvncserver`

<!--more-->

启动 tightvncserver

```
vncserver
```

关闭 tightvncserver


`vncserver -kill :1`


编辑 `~/.vnc/xstartup`

```
#!/bin/bash
xrdb $HOME/.Xresources
startxfce4 &
```

启动 tightvncserver

`vncserver`

连接 tightvncserver

{% asset_img "vnc-folder.png" "" %}

{% asset_img "vnc-connect.png" "" %}

{% asset_img "vnc-password.png" "" %}

{% asset_img "vnc-screen.png" "" %}


如果 tab 键无效的话

`vim ~/.config/xfce4/xfconf/xfce-perchannel-xml/xfce4-keyboard-shortcuts.xm`

将

`<property name="&lt;Super&gt;Tab" type="string" value="switch_window_key"/>`

替换为

`<property name="&lt;Super&gt;Tab" type="string" value="empty"/>`


* 运行 `vncserver`，如果没有配置文件 `~/.vnc/xstartup`，会生成一个
* VNC 默认端口为 5901，可以用 :1 表示。VNC 能够启用过个端口，比如 :2、:3 等。:X 对应 5900+X。
* `xrdb $HOME/.Xresources`, tells VNC's GUI framework to read the server user's .Xresources file. Xresources is where a user can make changes to certain settings of the graphical desktop, like terminal colors, cursor themes, and font rendering.
* `startxfce4 &` tells the server to launch Xfce, which is where you will find all of the graphical software that you need to comfortably manage your server.



如果喜欢 gnome 桌面的话

{% asset_img "vnc-gnome.png" "" %}

`sudo apt-get install -y ubuntu-desktop gnome-session-flashback tightvncserver xrdp`

* `ubuntu-desktop` and `gnome-session-flashback ` will install a desktop environment
* `tightvncserver` will install a VNC server
* `xrdp` will install an RDP server that you can connect to with Remote Desktop (it uses the RDP protocol)


配置文件 `~/.vnc/xstartup` 如下

```
#!/bin/sh
export XKL_XMODMAP_DISABLE=1
unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS

gnome-panel &
gnome-settings-daemon &
metacity &
nautilus &
gnome-terminal &
```

参考

* <https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-vnc-on-ubuntu-16-04>

### centos

```
sudo yum groupinstall -y "GNOME Desktop"
sudo yum install -y tigervnc-server
sudo cp /lib/systemd/system/vncserver@.service /etc/systemd/system/vncserver@:1.service
sudo vim /etc/systemd/system/vncserver@:1.service
# 替换 <USER>
sudo firewall-cmd --state
sudo systemctl stop firewalld
vncserver
vncserver -kill :1
```

参考

* <https://www.howtoforge.com/vnc-server-installation-on-centos-7>