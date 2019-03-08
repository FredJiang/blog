---
title: node rsa 使用
date: 2017-10-24 20:51:48
tags: [node, rsa, crypto, openssl]
---

* <https://doc.open.alipay.com/doc2/detail?treeId=58&articleId=103242&docType=1>
* <http://blog.csdn.net/qingkong999/article/details/48314009>
* <http://www.cnblogs.com/xiashan17/p/5909255.html>

<!--more-->

生成 key 文件

```sh
openssl
OpenSSL> genrsa -out rsa_private_key.pem 1024
OpenSSL> pkcs8 -topk8 -inform PEM -in rsa_private_key.pem -outform PEM -nocrypt -out rsa_private_key_pkcs8.pem
OpenSSL> rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
OpenSSL> exit
```

在 node 中使用 key 文件

```javascript
const crypto = require('crypto');
const fs = require('fs');
const privatePem = fs.readFileSync('./pem/rsa_private_key.pem');
const publicPem = fs.readFileSync('./pem/rsa_public_key.pem');

let priKey = privatePem.toString();
let pubKey = publicPem.toString();

const data = 'this is the data';

// 签名
let sign = crypto.createSign('RSA-SHA1');
sign.update(data);
let signData = sign.sign(priKey, 'base64');
console.log('signData');
console.log(signData);

// 验证
let verify = crypto.createVerify('RSA-SHA1');
verify.update(data);
let verifyData = verify.verify(pubKey, signData, 'base64');
console.log('verifyData');
console.log(verifyData);
```

输出结果

```
signData
G/pD2+19zVdXjEhjPezEoEcltydHs6T/Jfg+RN5s0DRlCgWpmnv3nrCOWPn8m7KNPAYg/+EFwW8rWHRJiCO25hyNBNvrV2YS4fipg6b1sEh8Ym6l6oDagoG3OJwFQAZmeI2m9l9fbVZa9QtlOcjKm0QCGD14TgLeK5Y4k0JLTY4=
verifyData
true
```

注意 key 文件的格式

rsa_private_key.pem

```
-----BEGIN RSA PRIVATE KEY-----
MIICXwIBAAKBgQDvlNb7thFS9k02DABDcs+021nCAr0isI+NjdgUV6FfK3ziEOv4
YWO+t+dCUbt+nYbo3Xf5EPFB+bsOkvKPKrIaTA8FZtIxxqNWatEbzQL5PMGZjNhk
cdPTTYA4E2NI5FirkpKvqEXoF/4oZ003IED9Xhfa1Kj7S2AVxuCUpXQ5FQIDAQAB
AoGBAL27lMnAtVWLQzhjJq5DtWRYNmwj+R8Izpbe11m80EprSTpLBmUs025Ne/KU
gbTTEe1GvuVbWoTSPiZbj4Z73JDYkUG2je1O50Dlqse+f2CBST6BWDIW+upgDe8h
tMkX85e/BfTQkMQ5xGM4kSr3EFiVLQS5ehLH6wc6+t0AlIIdAkEA+yCQF/AgKNMQ
QLta8i7HggkOEO24acSa5r51lLPSGONbUIeHgBrI6aeUlTGhtcpQ9uoiBznBkflI
XMgYvQsOcwJBAPQ67MX/v4a3jHFNMTcM9kZrYeK5v+iQzKbbkge8A2LcpS/mBCRz
kOQ4TAxyclwUNpktEkAV85Rjp53s8LYgcFcCQQDVIXTJrDVPEJqZpajxI/yVAyRZ
/7dkpMSmkvxtwRPNpaAJP40jjxf3Hg//c0kAZX3DoUBSC5WaUww0GmrMfoa7AkEA
iL15Fb6EKFQaENGsTWs3c+PpcTyYowh3XLCwyR3OM4rf/bpl9Vay9+RBR/LH7p/u
lcJzZmgj8Z/+F+CyQPZWjwJBAIZg4rPTiC23cdAo8U98GaIw0LHjpyvPvK4q8ZZc
nkR5EUj+Yjk/8C6NJna2gKACIuNqqzcYMm7GqIpqAByxAWU=
-----END RSA PRIVATE KEY-----
```

rsa_public_key.pem

```
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDvlNb7thFS9k02DABDcs+021nC
Ar0isI+NjdgUV6FfK3ziEOv4YWO+t+dCUbt+nYbo3Xf5EPFB+bsOkvKPKrIaTA8F
ZtIxxqNWatEbzQL5PMGZjNhkcdPTTYA4E2NI5FirkpKvqEXoF/4oZ003IED9Xhfa
1Kj7S2AVxuCUpXQ5FQIDAQAB
-----END PUBLIC KEY-----
```

如果拿到的 key 文件不是这个格式的话，可以参考 <http://blog.csdn.net/qingkong999/article/details/48314009> 处理 key

```
const crypto = require('crypto');
const fs = require('fs');
const publicPem = fs.readFileSync('./pem/rsa_public_key.pem');
const privatePem = fs.readFileSync('./pem/rsa_private_key.pem');

let priKey = privatePem.toString();
priKey = getPriKey(priKey);
console.log('priKey');
console.log(priKey);

let pubKey = publicPem.toString();
pubKey = getPubKey(pubKey);
console.log('pubKey');
console.log(pubKey);

const data = 'this is the data';

// 签名
let sign = crypto.createSign('RSA-SHA1');
// let sign = crypto.createSign('RSA-SHA256');
sign.update(data);
let signData = sign.sign(priKey, 'base64');
console.log('signData');
console.log(signData);

// 验证
let verify = crypto.createVerify('RSA-SHA1');
// let verify = crypto.createVerify('RSA-SHA256');
verify.update(data);
let verifyData = verify.verify(pubKey, signData, 'base64');
console.log('verifyData');
console.log(verifyData);

function getPubKey(pubKey) {
  pubKey = insertStr(pubKey, '\n', 64);
  pubKey = '-----BEGIN PUBLIC KEY-----\n' + pubKey + '-----END PUBLIC KEY-----';
  return pubKey;
}

function getPriKey(priKey) {
  priKey = insertStr(priKey, '\n', 64);
  if (priKey.length === 829) {
    console.log(priKey.length);
    priKey = '-----BEGIN RSA PRIVATE KEY-----\n' + priKey + '-----END RSA PRIVATE KEY-----';
  } else if (priKey.length === 862) {
    console.log(priKey.length);
    priKey = '-----BEGIN PRIVATE KEY-----\n' + priKey + '-----END PRIVATE KEY-----';
  }
  return priKey;
}

function insertStr(str, insertStr, sn) {
  let newstr = '';
  for (let i = 0; i < str.length; i += sn) {
    let tmp = str.substring(i, i + sn);
    newstr += (tmp + insertStr);
  }
  return newstr;
}
```


