---
title: mybatis 使用
date: 2018-02-21 23:08:11
tags: [mybatis, java, maven, jdbc, mysql]
---

<https://www.tutorialspoint.com/mybatis/index.htm>

<!--more-->

### insert

{% asset_img "1.png" "" %}

{% asset_img "2.png" "" %}

`mvn clean package exec:java -Dexec.mainClass="com.mycompany.app.MybatisInsert"`

### read all

{% asset_img "3.png" "" %}

`mvn clean package exec:java -Dexec.mainClass="com.mycompany.app.MybatisRead_ALL"`

### read one

{% asset_img "4.png" "" %}

`mvn clean package exec:java -Dexec.mainClass="com.mycompany.app.MybatisRead_byID`

### update one

{% asset_img "5.png" "" %}

`mvn clean package exec:java -Dexec.mainClass="com.mycompany.app.MybatisUpdate"`

### Annotation

SqlMapConfig.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="com.mysql.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/demo"/>
        <property name="username" value="root"/>
        <property name="password" value="password"/>
      </dataSource>
    </environment>
  </environments>
  <!-- <mappers> -->
  <!--   <mapper resource="com/mycompany/app/Student.xml"/> -->
  <!-- </mappers> -->
</configuration>
```

Student_mapper.java

```java
package com.mycompany.app;

import java.util.List;
import org.apache.ibatis.annotations.*;

public interface Student_mapper {

  final String getAll = "SELECT * FROM student";
  final String getById = "SELECT * FROM student WHERE ID = #{id}";
  final String deleteById = "DELETE from student WHERE ID = #{id}";
  final String insert =
      "INSERT INTO student (NAME, BRANCH, PERCENTAGE, PHONE, EMAIL ) VALUES (#{name}, #{branch}, #{percentage}, #{phone}, #{email})";
  final String update =
      "UPDATE student SET EMAIL = #{email}, NAME = #{name}, BRANCH = #{branch}, PERCENTAGE = #{percentage}, PHONE = #{phone} WHERE ID = #{id}";

  @Select(getAll)
  @Results(
    value = {
      @Result(property = "id", column = "ID"),
      @Result(property = "name", column = "NAME"),
      @Result(property = "branch", column = "BRANCH"),
      @Result(property = "percentage", column = "PERCENTAGE"),
      @Result(property = "phone", column = "PHONE"),
      @Result(property = "email", column = "EMAIL")
    }
  )
  List getAll();

  @Select(getById)
  @Results(
    value = {
      @Result(property = "id", column = "ID"),
      @Result(property = "name", column = "NAME"),
      @Result(property = "branch", column = "BRANCH"),
      @Result(property = "percentage", column = "PERCENTAGE"),
      @Result(property = "phone", column = "PHONE"),
      @Result(property = "email", column = "EMAIL")
    }
  )
  Student getById(int id);

  @Update(update)
  void update(Student student);

  @Delete(deleteById)
  void delete(int id);

  @Insert(insert)
  @Options(useGeneratedKeys = true, keyProperty = "id")
  void insert(Student student);
}
```

Annotations_Example.java

```java
package com.mycompany.app;

import java.io.IOException;
import java.io.Reader;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class Annotations_Example {
  public static void main(String args[]) throws IOException {
    Reader reader = Resources.getResourceAsReader("SqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
    SqlSession session = sqlSessionFactory.openSession();
    session.getConfiguration().addMapper(Student_mapper.class);
    Student_mapper mapper = session.getMapper(Student_mapper.class);
    Student student = new Student();
    student.setName("zara");
    student.setBranch("EEE");
    student.setEmail("zara@gmail.com");
    student.setPercentage(90);
    student.setPhone(123412341);
    mapper.insert(student);
    System.out.println("record inserted successfully");
    session.commit();
    session.close();
  }
}
```

`mvn clean package exec:java -Dexec.mainClass="com.mycompany.app.Annotations_Example"`