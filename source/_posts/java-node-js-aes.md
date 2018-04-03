---
title: java node.js aes
date: 2018-02-08 16:27:38
tags: [java, node.js, aes, encrypt]
---

* <https://www.codeday.top/2017/07/14/27193.html>
* <http://nodejs.javascripti.com/encrypt-in-node-and-decrypt-in-java.html>
* <https://stackoverflow.com/questions/19698721/encrypt-in-node-and-decrypt-in-java>
* <http://www.liangcuntu.com/aes_for_nodejs_php_java_python>
* <https://liuzy88.com/topic/b86948083dc646b695eeceed1812a8b4.html>

<!--more-->

App.java

```
package com.mycompany.app;

import java.security.Key;
import java.security.MessageDigest;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;

public class App {
  public static final String DEFAULT_CODING = "UTF-8";

  public static String en128(String content, String key) throws Exception {
    MessageDigest md = MessageDigest.getInstance("MD5");
    byte[] keyDigestBytes = md.digest(key.getBytes(DEFAULT_CODING));
    SecretKeySpec skc = new SecretKeySpec(keyDigestBytes, "AES");

    Cipher cipher = Cipher.getInstance("AES");
    cipher.init(Cipher.ENCRYPT_MODE, skc);

    byte[] cipherBytes = cipher.doFinal(content.getBytes(DEFAULT_CODING));
    return Base64.encodeBase64String(cipherBytes);
  }
  
  private static String de128(String encrypted, String key) throws Exception {
    MessageDigest md = MessageDigest.getInstance("MD5");
    byte[] keyDigestBytes = md.digest(key.getBytes(DEFAULT_CODING));
    SecretKeySpec skc = new SecretKeySpec(keyDigestBytes, "AES");

    Cipher cipher = Cipher.getInstance("AES");
    cipher.init(Cipher.DECRYPT_MODE, skc);

    byte[] clearBytes = cipher.doFinal(Base64.decodeBase64(encrypted));
    return new String(clearBytes);
  }

  public static String en128vi(String content, String key) throws Exception {
    byte[] keyDigestBytes = key.getBytes(DEFAULT_CODING);
    SecretKeySpec skc = new SecretKeySpec(keyDigestBytes, "AES");

    Cipher cipher = Cipher.getInstance("AES");
    cipher.init(Cipher.ENCRYPT_MODE, skc);

    byte[] cipherBytes = cipher.doFinal(content.getBytes(DEFAULT_CODING));
    return Base64.encodeBase64String(cipherBytes);
  }
  
  private static String de128vi(String encrypted, String key) throws Exception {
    byte[] keyDigestBytes = key.getBytes(DEFAULT_CODING);
    SecretKeySpec skc = new SecretKeySpec(keyDigestBytes, "AES");

    Cipher cipher = Cipher.getInstance("AES");
    cipher.init(Cipher.DECRYPT_MODE, skc);

    byte[] clearBytes = cipher.doFinal(Base64.decodeBase64(encrypted));
    return new String(clearBytes);
  }

  public static void main(String[] args) throws Exception {

    String aesSecrect = "1234567890123456";
    String originString = "1";
    String encrypted = "";
    String decrypted = "";

    originString = "1";
    System.out.println("originString " + originString);

    encrypted = App.en128("1", aesSecrect);
    System.out.println("encrypted " + encrypted);

    decrypted = App.de128(encrypted, aesSecrect);
    System.out.println("decrypted " + decrypted);

    originString = "1";
    System.out.println("originString " + originString);

    encrypted = App.en128vi("1", aesSecrect);
    System.out.println("encrypted " + encrypted);

    decrypted = App.de128vi(encrypted, aesSecrect);
    System.out.println("decrypted " + decrypted);
    
    // originString 1
    // encrypted 8EiTzFt0AA2tUUnk1ByOkw==
    // decrypted 1
    // originString 1
    // encrypted eXH1hDuwDQ+MlHme53FHEA==
    // decrypted 1
  }
}
```

App.js

```
const crypto = require('crypto');

function en128(data, key) {
  var cipher = crypto.createCipher('aes-128-ecb', key);
  return cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
}

function de128(data, key) {
  var cipher = crypto.createDecipher('aes-128-ecb', key);
  return cipher.update(data, 'base64', 'utf8') + cipher.final('utf8');
}

function en128vi(data, key) {
  var cipher = crypto.createCipheriv('aes-128-ecb', key, '');
  cipher.setAutoPadding(true);
  return cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
}

function de128vi(data, key) {
  var cipher = crypto.createDecipheriv('aes-128-ecb', key, '');
  cipher.setAutoPadding(true);
  return cipher.update(data, 'base64', 'utf8') + cipher.final('utf8');
}

let aesSecrect = '1234567890123456';
let originString = '1';
let encrypted = '';
let decrypted = '';

originString = '1';
console.log(`originString ${originString}`);

encrypted = en128(originString, aesSecrect);
console.log(`encrypted ${encrypted}`);

decrypted = de128(encrypted, aesSecrect);
console.log(`decrypted ${decrypted}`);

originString = '1';
console.log(`originString ${originString}`);

encrypted = en128vi(originString, aesSecrect);
console.log(`encrypted ${encrypted}`);

decrypted = de128vi(encrypted, aesSecrect);
console.log(`decrypted ${decrypted}`);

// originString 1
// encrypted 8EiTzFt0AA2tUUnk1ByOkw==
// decrypted 1
// originString 1
// encrypted eXH1hDuwDQ+MlHme53FHEA==
// decrypted 1
```
