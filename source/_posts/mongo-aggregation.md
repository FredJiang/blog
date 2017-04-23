---
title: mongo aggregation
date: 2017-03-28 16:41:13
tags: [mongo, aggregation]
---




用以下命令准备数据

```
db.students.save({age:1, class:"1"})
db.students.save({age:1, class:"1"})
db.students.save({age:2, class:"1"})
db.students.save({age:3, class:"1"})
db.students.save({age:4, class:"1"})
db.students.save({age:4, class:"1"})
db.students.save({age:4, class:"1"})
db.students.save({age:4, class:"2"})
db.students.save({age:4, class:"2"})
db.students.save({age:4, class:"3"})
```

<!--more-->

或

```
db.students.count()
for (var i = 0; i < 100 * 10000; i++) {
  db.students.save({age:1, class:"1"});
}
db.students.count()
```

### aggregate

* <https://docs.mongodb.com/manual/aggregation/>
* <https://docs.mongodb.com/manual/reference/operator/aggregation/group/>
* <https://docs.mongodb.com/manual/reference/operator/aggregation/#aggregation-expression-operators>




```
db.students.aggregate([
  {
    $match: {
      "class": "1"
    }
  },
  {
    $group: {
      _id: {
        age: "$age",
      },
      count: { $sum: 1 }
    }
  },
  {
    $match: {
      count: { $gt: 1 }
    }
  },
  {
    $sort: { count: 1 }
  }
])
```


以上命令说明

* 根据管道（pipe）的性质，$match 后的数据流到 $group，再流到 $match，再到 $sort


如果报如下错误


```
assert: command failed: {
	"ok" : 0,
	"errmsg" : "Exceeded memory limit for $group, but didn't allow external sort. Pass allowDiskUse:true to opt in.",
	"code" : 16945
} : aggregate failed
_getErrorWithCode@src/mongo/shell/utils.js:25:13
doassert@src/mongo/shell/assert.js:16:14
assert.commandWorked@src/mongo/shell/assert.js:290:5
DBCollection.prototype.aggregate@src/mongo/shell/collection.js:1312:5
@(shell):1:1
```

可以这样解决


```
db.students.aggregate([
    {
      $match: {
        "class": "1"
      }
    },
    {
      $group: {
        _id: {
          age: "$age",
        },
        count: { $sum: 1 }
      }
    },
    {
      $match: {
        count: { $gt: 1 }
      }
    },
    {
      $sort: { count: 1 }
    },
    {
      $out: "students_aggregate"
    }
  ],
  {
    allowDiskUse: true
  }
)
```

* allowDiskUse 为 true
* $out 表示将结果输出到新表 students_aggregate，这里可以不使用

### mapReduce

* <https://docs.mongodb.com/manual/reference/command/mapReduce/#dbcmd.mapReduce>

```
db.students.mapReduce(
  function() {
    emit(this.age, 1)
  },
  function(key, values) {
    return Array.sum(values);
  },
  {
    query: {
      "class": "1"
    },
    out: "students_mapReduce"
  }
)
```

```
db.students_mapReduce.find()
```

以上命令说明

* emit 中的两个参数分别对应 key 和 value，values 是所有 value 的集合
* Array.sum(values) 对某个 key 的所有 value 做累加
 




