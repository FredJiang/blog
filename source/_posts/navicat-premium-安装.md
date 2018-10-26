---
title: navicat premium 安装
date: 2018-10-26 23:39:16
tags: [navicat, mysql, mac]
---

下载 navicat

<https://www.navicat.com/en/products>

<!--more-->

安装 navicat

下载 keygen

<https://github.com/DoubleLabyrinth/navicat-keygen/tree/mac>

{% asset_img "1.png" "" %}

生成证书

{% asset_img "2.png" "" %}

{% asset_img "3.png" "" %}

关闭 navicat

删掉老的 navicat 密码

{% asset_img "4.png" "" %}

运行 keygen

```bash
cd navicat-patcher

make release

cd ../navicat-keygen

make release

cd ../navicat-patcher

./navicat-patcher /Applications/Navicat\ Premium.app/Contents/MacOS/Navicat\ Premium

codesign -f -s "self-signed-code-sign-certificate" /Applications/Navicat\ Premium.app/Contents/MacOS/Navicat\ Premium

cd ../navicat-keygen

./navicat-keygen 2048key.pem

#等待 Input Request Code
```

<https://github.com/DoubleLabyrinth/navicat-keygen/blob/mac/README.md>

1. ...
2. ...
3. ...
4. Then goto `navicat-keygen` folder and in Terminal:
   ```bash
   $ ./navicat-keygen 2048key.pem
   ```
   You will get a __snKey__ and be asked to input your name and organization.
   Just input and then you will be asked to input the request code. Now DO NOT CLOSE KEYGEN.
5. Open Navicat Premium, find and click `Registration`. Then input `Registration Key` by __snKey__ that keygen gave. Then click `Activate`.
6. Generally online activation will failed and Navicat will ask you do `Manual Activation`, just choose it.
7. Copy your request code and paste it in keygen. Leave empty line to tell keygen that your input ends (in other words, type `Enter` at least twice).
8. Then you will get activation code which looks like a Base64 string. Just copy it and paste it in Navicat `Manual Activation` window, then click `Activate`. If nothing is wrong, activation should be done successfully.
9. Finally, restore your database connection configurations if you have.
