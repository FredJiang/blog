---
title: python 版本切换
date: 2019-06-13 13:38:09
tags: [python, pip]
---

```shell
ls -lh     /usr/local/bin | grep -e "\spip" -e "\spython"

sudo rm    /usr/local/bin/pip                           && \
sudo rm    /usr/local/bin/python                        && \
sudo ln -s /usr/local/bin/pip3    /usr/local/bin/pip    && \
sudo ln -s /usr/local/bin/python3 /usr/local/bin/python


ls -lh     /usr/bin       | grep -e "\spip" -e "\spython"

sudo rm    /usr/bin/pip                                 && \
sudo rm    /usr/bin/python                              && \
sudo ln -s /usr/bin/pip3          /usr/local/bin/pip    && \
sudo ln -s /usr/bin/python3       /usr/local/bin/python
```
