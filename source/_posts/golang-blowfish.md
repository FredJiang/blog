---
title: golang blowfish
date: 2017-10-18 11:41:10
tags: [golang, blowfish, crypto, encrypt]
---

`go get -u -v golang.org/x/crypto`

或

```
mkdir -p $GOPATH/src/golang.org/x/
cd $GOPATH/src/golang.org/x/
git clone git@github.com:golang/crypto.git
```

<!--more-->

`cat encrypt.go`

```
package main

import (
    "crypto/cipher"
    "encoding/base64"

    "github.com/labstack/gommon/log"
    "golang.org/x/crypto/blowfish"
)

func main() {
    decrypt()
    encrypt()
}

func decrypt() {
    key := []byte("key12345")
    IV := []byte("iv123456")

    ci, _ := blowfish.NewCipher(key)
    // NewCFBDecrypter 和 NewCFBEncrypter 好像可以随便用
    en := cipher.NewCFBDecrypter(ci, IV)
    // en := cipher.NewCFBEncrypter(ci, IV)

    data, _ := base64.URLEncoding.DecodeString("fY42LP3IL6A=")
    dst := make([]byte, len(data))
    en.XORKeyStream(dst, data)

    log.Info(string(dst))
}

func encrypt() {
    key := []byte("key12345")
    IV := []byte("iv123456")

    ci, _ := blowfish.NewCipher(key)
    // NewCFBDecrypter 和 NewCFBEncrypter 好像可以随便用
    en := cipher.NewCFBDecrypter(ci, IV)
    // en := cipher.NewCFBEncrypter(ci, IV)

    data := []byte("abcdefgh")
    dst := make([]byte, len(data))
    en.XORKeyStream(dst, data)

    log.Info(base64.URLEncoding.EncodeToString(dst))
}
```


`go run encrypt.go`

```
{"time":"2017-10-07T08:01:30.259400145+08:00","level":"INFO","prefix":"-","file":"encrypt.go","line":"28","message":"abcdefgh"}
{"time":"2017-10-07T08:01:30.259594751+08:00","level":"INFO","prefix":"-","file":"encrypt.go","line":"43","message":"fY42LP3IL6A="}
```


参考

* <https://kelvin.mbioq.com/2017/07/09/block-cipher-mode-of-operation.html>
* <https://gist.github.com/mickelsonm/e1bf365a149f3fe59119>
* [node.js blowfish 加密](../../../../2017/08/21/node-js-blowfish-加密/)


