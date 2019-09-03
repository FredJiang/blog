---
title: Undefined symbols for architecture
date: 2019-05-28 14:56:51
tags: [ios, xcode, oc]
---

* <http://nsomar.com/how-to-get-the-symbols-in-a-static-lib-slice/>
* <https://www.thegeekstuff.com/2012/03/linux-nm-command/>
* <https://www.thegeekstuff.com/2011/10/gcc-linking/>
* <https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/nm.html>

<!--more-->

```sh
lipo -info       libx.a

nm -g -arch i386 libx.a | grep -n -i yourKeyWord
nm -A            libx.a | cut -d' ' -f1 | uniq | sort | uniq
otool -L         libx.a
```

```text
Undefined symbols for architecture x86_64:
  "_Encoder_Interface_Encode", referenced from:
      _EncodePCMToAMR in AmrFileCodec.o
  "_Encoder_Interface_exit", referenced from:
      _EncodePCMToAMR in AmrFileCodec.o
  "_Decoder_Interface_init", referenced from:
      _DecodeAMRToWAVE in AmrFileCodec.o
  "_Decoder_Interface_Decode", referenced from:
      _DecodeAMRToWAVE in AmrFileCodec.o
  "_Encoder_Interface_init", referenced from:
      _EncodePCMToAMR in AmrFileCodec.o
  "_Decoder_Interface_exit", referenced from:
      _DecodeAMRToWAVE in AmrFileCodec.o
ld: symbol(s) not found for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

```sh
nm -g EaseMobSDK/lib/libEaseMobClientSDKLite.a | grep -n -i '_Interface_'
nm -g ~/Downloads/iOS_IM_SDK_V3.5.5/EMiOSDemo/EMiOSDemo/Class/Helper/3rdParty/VoiceConvert/libopencore-amrnb.a  | grep -n -i '_Interface_'
nm -g ~/Downloads/iOS_IM_SDK_V3.5.5/EMiOSDemo/EMiOSDemo/Class/Helper/3rdParty/VoiceConvert/libopencore-amrwb.a  | grep -n -i '_Interface_'
```
