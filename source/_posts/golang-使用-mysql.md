---
title: golang 使用 mysql
date: 2017-11-30 15:06:25
tags: [mysql, golang, gorm]
---

参考

* [golang 生成 mysql 表的 struct](../../../../2017/11/29/golang-生成-mysql-表的-struct/)
* <https://github.com/Shelnutt2/db2struct>

生成表

<!--more-->


cat user.go

```
package mysql

import (
    "database/sql"
    "time"
)

type User struct {
    // http://jinzhu.me/gorm/models.html#model-definition
    Avatar         sql.NullString `gorm:"column:avatar" json:"avatar"`
    CompleteMobile sql.NullString `gorm:"column:complete_mobile" json:"complete_mobile"`
    CreateAt       time.Time      `gorm:"column:create_at" json:"create_at"`
    ID             int            `gorm:"column:id" json:"id"`
    Locale         string         `gorm:"column:locale" json:"locale"`
    Mobile         string         `gorm:"column:mobile" json:"mobile"`
    Password       string         `gorm:"column:password" json:"password"`
    State          int            `gorm:"column:state" json:"state"`
    TmpPswd        string         `gorm:"column:tmp_pswd" json:"tmp_pswd"`
    UpdateAt       time.Time      `gorm:"column:update_at" json:"update_at"`
    UserID         string         `gorm:"column:user_id" json:"user_id"`
    Username       sql.NullString `gorm:"column:username" json:"username"`
}

// TableName sets the insert table name for this struct type
func (u *User) TableName() string {
    return "users"
}
```

读取数据库数据

cat user_test.go

```
package mysql

import (
    "testing"

    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/mysql"
    "github.com/labstack/gommon/log"
)

func TestMysql(t *testing.T) {
    // http://jinzhu.me/gorm/database.html#connecting-to-a-database
    db, err := gorm.Open("mysql", "user:password@tcp(127.0.0.1:3306)/dbName?charset=utf8&parseTime=True&loc=Local")
    if err != nil {
        log.Info(err)
        panic("failed to connect database")
    }
    defer db.Close()

    // http://jinzhu.me/gorm/crud.html#query
    user := User{}
    db.Where(&User{Mobile: "15210491279"}).First(&user)
    log.Info(user)

    users := []User{}
    db.Where(&User{Locale: "886"}).Limit(2).Find(&users)
    log.Info(users)
}
```

{% asset_img "1.png" "" %}

{% asset_img "2.png" "" %}


使用自定义的表名

`db.Table("users").Where(&User{Mobile: "15210491279"}).First(&user)`
