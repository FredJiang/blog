---
title: node 源码编译
date: 2018-04-28 14:11:53
tags: [node.js, c++, javascript, clion, ide]
---

<https://github.com/nodejs/node/blob/master/BUILDING.md>

<!--more-->

下载代码

```
git clone https://github.com/nodejs/node.git
```

检查工具版本

```
echo ''                   && \
echo 'gcc     --version ' && gcc     --version && echo '' && \
echo 'g++     --version ' && g++     --version && echo '' && \
echo 'clang   --version ' && clang   --version && echo '' && \
echo 'clang++ --version ' && clang++ --version && echo '' && \
echo 'make    --version ' && make    --version && echo '' && \
echo 'python  --version ' && python  --version

On macOS, you will need to install the Xcode Command Line Tools by running `xcode-select --install`.
Alternatively,
if you already have the full Xcode installed, you can find them under the menu `Xcode -> Open Developer Tool -> More Developer Tools...`.
This step will install clang, clang++, and make.

https: //developer.apple.com/download/more/
```

开始编译

```
cd node
./configure
make -j4
```

测试

```
./node -e "console.log('Hello from Node.js ' + process.version)"
```

在 node 源码里添加日志

{% asset_img "main1.png" "" %}

{% asset_img "main2.png" "" %}

{% asset_img "main3.png" "" %}

```
make -j4

./node -e "console.log('Hello from Node.js ' + process.version)"
```


编译可用 gdb 调试的版本

```
./configure --gdb --debug # --gdb 参数好像可以不用
make -j4

ls -lh ./            | grep node
ls -lh ./out/Release | grep node
ls -lh ./out/Debug/  | grep node

# ls -lh ./            | grep node
# lrwxrwxrwx  1 fred fred   16 Apr 29 01:10 node -> out/Release/node
# lrwxrwxrwx  1 fred fred   14 Apr 29 03:17 node_g -> out/Debug/node
# -rw-rw-r--  1 fred fred  33K Apr 27 23:31 node.gyp
# -rw-rw-r--  1 fred fred  11K Apr 27 23:31 node.gypi
# 
# ls -lh ./out/Release | grep node
# -rwxrwxr-x  1 fred fred  38M Apr 29 01:09 node
# 
# ls -lh ./out/Debug/  | grep node
# -rwxrwxr-x  1 fred fred 475M Apr 29 02:48 node

gdb -tui ./out/Debug/node -e "console.log('Hello from Node.js ' + process.version)"

gdb -tui ./node_g         -e "console.log('Hello from Node.js ' + process.version)"
```

使用 ninja 编译

<https://github.com/nodejs/node/blob/master/doc/guides/building-node-with-ninja.md>

```
sudo apt-get install ninja-build # linux
brew install ninja # mac

./configure --ninja
ninja -C out/Release # ninja -C out/Debug 
```


使用 clion 调试（一）（测试成功）

<http://hiihl.com/articles/2018/1/15/learnnode1.md>

```
./configure --debug
PATH=/usr/bin:$PATH: # 在我本机使用 /usr/bin/python --version > Python 2.7.10
make -j2 -C out BUILDTYPE=Debug
```

编译时，可以使用如下命令查看 cpu 使用情况

`top -o cpu`

编译好了后，在 clion 导入（是导入） node 项目


使用 clion 调试（二）

<https://github.com/lev-kazakov/node-cmake-generator>

```
git checkout v8.9.4
PATH=/usr/bin:$PATH: # 在我本机使用 /usr/bin/python --version > Python 2.7.10
PATH=/Users/Fred/.nvm/versions/node/v8.9.4/bin:$PATH: # 
npm install -g node-cmake-generator
/Users/Fred/.nvm/versions/node/v8.9.4/bin/node-cmake-generator
```

编译好了后，在 clion 打开（是打开） node 项目


详细了解 node 可以参考

<https://yjhjstz.gitbooks.io/deep-into-node/content/>

