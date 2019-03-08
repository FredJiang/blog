---
title: md5 命令
date: 2018-09-06 15:10:00
tags: [md5]
---

### mac

`md5 -s 11111111`
`MD5 ("11111111") = 1bbd886460827015e5d605ed44252251`

`echo -n "11111111" | md5`
`1bbd886460827015e5d605ed44252251`

`md5 <<< 11111111`
`8ddae0e3780a6b9dcf84399fd092f7e2`

`echo '11111111' | md5`
`8ddae0e3780a6b9dcf84399fd092f7e2`

### linux

`echo -n "11111111" | md5sum`
`1bbd886460827015e5d605ed44252251  -`

`echo "11111111" | md5sum`
`8ddae0e3780a6b9dcf84399fd092f7e2  -`

### nodejs

`console.log(require('crypto').createHash('md5').update('11111111').digest('hex'));`
`1bbd886460827015e5d605ed44252251`

`console.log(require('crypto').createHash('md5').update('11111111\n').digest('hex'));`
`8ddae0e3780a6b9dcf84399fd092f7e2`
