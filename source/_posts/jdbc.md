---
title: jdbc
date: 2019-08-18 22:15:49
tags: [java, jdbc]
---

* <https://www.tutorialspoint.com/jdbc/jdbc-sample-code.htm>
* <https://www.tutorialspoint.com/jdbc/jdbc-db-connections.htm>
* <https://www.tutorialspoint.com/jdbc/jdbc-statements.htm>
<!--more-->

There are following six steps involved in building a JDBC application

1. Import the packages: Requires that you include the packages containing the JDBC classes needed for database programming. Most often, using import java.sql.* will suffice.
2. Register the JDBC driver: Requires that you initialize a driver so you can open a communication channel with the database.
3. Open a connection: Requires using the DriverManager.getConnection() method to create a Connection object, which represents a physical connection with the database.
4. Execute a query: Requires using an object of type Statement for building and submitting an SQL statement to the database.
5. Extract data from result set: Requires that you use the appropriate ResultSet.getXXX() method to retrieve the data from the result set.
6. Clean up the environment: Requires explicitly closing all database resources versus relying on the JVM's garbage collection.

pom.xml

```xml
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.17</version>
        </dependency>
```
