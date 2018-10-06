---
title: svg 转 png
date: 2018-09-05 07:19:38
tags: [librsvg, svg, png, linux, javascript]
---

需求 svg 格式的验证码在 ie 上显示不出来，需要转成 png 的

<!--more-->

node 库用的 [sharp](https://github.com/lovell/sharp)

安装 `npm install sharp` sharp 报错

>../src/common.cc:25:22: fatal error: vips/vips8: No such file or directory

使用 sharp 需要安装 [libvips](https://github.com/jcupitt/libvips)

机器版本 CentOS release 6.10 (Final)


```bash
sudo yum update -y
sudo yum groupinstall -y "Development Tools"
sudo yum install -y librsvg2 librsvg2-devel libpng libpng-devel ImageMagick ImageMagick-devel libgnomeui libgnomeui-devel

cd
wget 'https://github.com/jcupitt/libvips/releases/download/v8.7.0-rc3/vips-8.7.0-rc3.tar.gz'
cd ~/vips-8.7.0
./configure
make && sudo make install

# configure: error: Package requirements (glib-2.0 >= 2.6 gmodule-2.0 gobject-2.0) were not met:
# No package 'glib-2.0' found
# No package 'gmodule-2.0' found
# No package 'gobject-2.0' found
# 解决以上问题用 sudo yum install -y libgnomeui libgnomeui-devel

# configure: error: Could not find the Expat library
# 解决以上问题需要安装 expat
cd
wget 'http://downloads.sourceforge.net/expat/expat-2.0.1.tar.gz'
cd ~/expat-2.0.1
./configure --prefix=/usr
make && sudo make install
```

sharp 安装好了，不过报错

>Input buffer contains unsupported image format


```bash
cd ~/vips-8.7.0
./configure
# SVG import with librsvg-2.0:        no
#   (requires librsvg-2.0 2.34.0 or later)

yum --showduplicates list *librsvg2*
# Installed Packages
# librsvg2.x86_64       2.26.0-14.el6
# librsvg2-devel.x86_64 2.26.0-14.el6
```

* <https://www.npmjs.com/package/librsvg>
    - 支持 buffer
    - 需要装 librsvg
* <https://www.npmjs.com/package/svg-to-png>
    - 没有 buffer
    - 不需要装库
* <https://www.npmjs.com/package/svg2png>
    - 有 buffer
    - 不需要装库

