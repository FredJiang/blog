---
title: ubuntu update-alternatives
date: 2019-04-07 11:03:13
tags: [ubuntu, python]
---

```sh
ls -lh /etc/alternatives/ | grep -e 'python' -e 'pip'
ls -lh /usr/bin/          | grep -e 'python' -e 'pip'
ls -lh /usr/local/bin     | grep -e 'python' -e 'pip'

#      update-alternatives --install <link>          <name> <path>             <priority> #. 增加一组新的系统命令连接
# sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.6 1
# sudo update-alternatives --config                  python #. 以交互的形式进行软件切换 
# sudo update-alternatives --set                     python /usr/bin/python3.6
# sudo update-alternatives --remove-all              python
# sudo update-alternatives --remove                  python <path>
# sudo update-alternatives --display                 python
# sudo update-alternatives --list                    python
# sudo update-alternatives --query                   python

sudo apt-get update  -y && \
sudo apt-get upgrade -y && \
sudo apt-get install -y \
                        build-essential \
                        python-dev \
                        python-setuptools \
                        python-pip \
                        python3-pip \
                        python3

# yum search python3
sudo yum groupinstall -y "Development tools" && \
sudo yum update  -y && \
sudo yum upgrade -y && \
sudo yum install -y \
                    bzip2-devel \
                    epel-release \
                    ncurses-devel \
                    openssl \
                    openssl-devel \
                    python \
                    python-devel \
                    python-pip \
                    python-setuptools \
                    python36 \
                    python36-devel \
                    python36-pip \
                    sqlite-devel \
                    yum-utils \
                    zlib \
                    zlib-devel

sudo rm    /usr/bin/pip && \
sudo rm    /usr/local/bin/pip && \
sudo rm    /usr/bin/python && \
sudo rm    /usr/local/bin/python && \
sudo ln -s /usr/bin/pip3    /usr/bin/pip && \
sudo ln -s /usr/bin/pip3    /usr/local/bin/pip && \
sudo ln -s /usr/bin/python3 /usr/bin/python && \
sudo ln -s /usr/bin/python3 /usr/local/bin/python

sudo python -m pip install -U pip

pip show pip
```
