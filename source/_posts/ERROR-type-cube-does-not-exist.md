---
title: 'ERROR:  type cube does not exist'
date: 2016-07-31 00:21:35
tags: [postgresql, db]
---

```
psql book -c "SELECT '1'::cube;"
```

> ERROR:  type "cube" does not exist

`sudo yum install postgresql-contrib`

```
psql -d book
CREATE EXTENSION cube;  
\q
```

<!--more-->



参考 <http://stackoverflow.com/questions/12589127/trouble-installing-additional-module-cube-in-postgresql-8-4>