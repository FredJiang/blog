---
title: base64
date: 2018-11-13 12:00:57
tags: [base64]
---

```bash
echo -n "1234567890" | base64
MTIzNDU2Nzg5MA==

echo 'MTIzNDU2Nzg5MA==' | base64 --decode
base64 --decode <<< 'MTIzNDU2Nzg5MA=='
```