---
title: node.js blowfish 加密
date: 2017-08-21 22:25:43
tags: [blowfish, node.js, crypto]
---


文档

<https://nodejs.org/api/crypto.html#crypto_cipher_update_data_inputencoding_outputencoding>

<!--more-->


```
const crypto = require('crypto')
// 打印有哪些加密方法
// console.log(crypto.getCiphers())
// console.log(crypto.getHashes())

let cipher = null;
let decipher = null;
let encrypted = null;
let decrypted = null;

cipher = crypto.createCipher('aes192', 'a password');
encrypted = cipher.update('some clear text data', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(encrypted);

decipher = crypto.createDecipher('aes192', 'a password');
decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);
console.log('------');


cipher = crypto.createCipher('blowfish', 'a password');
cipher.setAutoPadding(true);
encrypted = cipher.update('some clear text data', 'utf8', 'base64');
encrypted += cipher.final('base64');
console.log(encrypted);

decipher = crypto.createDecipher('blowfish', 'a password');
decipher.setAutoPadding(true);
decrypted = decipher.update(encrypted, 'base64', 'utf8');
decrypted += decipher.final('utf-8');
console.log(decrypted);
console.log('------');


cipher = crypto.createCipheriv('bf-cfb', 'key12345', 'iv123456');
cipher.setAutoPadding(false);
encrypted = cipher.update('abcdefgh', 'utf-8', 'hex');
encrypted += cipher.final('hex');
console.log(encrypted);

decipher = crypto.createDecipheriv('bf-cfb', 'key12345', 'iv123456');
decipher.setAutoPadding(false);
decrypted = decipher.update(encrypted, 'hex', 'utf-8');
decrypted += decipher.final('utf-8');
console.log(decrypted);
console.log('------');


cipher = crypto.createCipheriv('bf-cfb', 'key12345', 'iv123456');
cipher.setAutoPadding(false);
encrypted = cipher.update('abcdefgh', 'utf-8', 'base64');
encrypted += cipher.final('base64');
console.log(encrypted);

decipher = crypto.createDecipheriv('bf-cfb', 'key12345', 'iv123456');
decipher.setAutoPadding(false);
decrypted = decipher.update(encrypted, 'base64', 'utf-8');
decrypted += decipher.final('utf-8');
console.log(decrypted);
console.log('------');
```


输出

```
ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504
some clear text data
------
sNqeApF3AIwbghSWRwzDN/TIYmKJTVk8
some clear text data
------
7d8e362cfdc82fa0
abcdefgh
------
fY42LP3IL6A=
abcdefgh
------
```


编码的相关信息

* [utf-8 和 base64](../../../../2017/08/21/utf-8-和-base64/)
* [ASCII、Unicode、GBK和UTF-8字符编码的区别联系](../../../../2016/08/30/ASCII、Unicode、GBK和UTF-8字符编码的区别联系/)

