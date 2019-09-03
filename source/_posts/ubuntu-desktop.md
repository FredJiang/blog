---
title: ubuntu desktop
date: 2019-06-17 16:46:54
tags: [ubuntu]
---

* <https://askubuntu.com/questions/1149957/unable-to-login-to-account-in-ubuntu-18-04-vmware-workstation-15-after-update>

<!--more-->

```shell
sudo apt-get install -y --reinstall open-vm-tools && \
sudo apt-get install -y --reinstall open-vm-tools-desktop && \
sudo apt-get install -y --reinstall ubuntu-desktop

# tar xzf /media/`whoami`/VMware\ Tools/VMwareTools-*.tar.gz -C /tmp/
# sudo /tmp/vmware-tools-distrib/vmware-install.pl

sudo reboot
```