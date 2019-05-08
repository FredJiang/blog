---
title: java reflection
date: 2019-03-06 17:32:54
tags: [java, reflection]
---

<https://www.journaldev.com/1789/java-reflection-example-tutorial>

<!--more-->

1. java.lang.Class is the entry point for all the reflection operations. For every type of object, JVM instantiates an immutable instance of java.lang.Class that provides methods to examine the runtime properties of the object and create new objects, invoke its method and get/set object fields.
2. We can get Class of an object using three methods
    * through static variable class
        * For primitive types and arrays, we can use static variable class
        * Wrapper classes provide another static variable TYPE to get the class
    * using getClass() method of object
    * java.lang.Class.forName(String fullyClassifiedClassName)

```java
package com.fred.app;

public class App {
    public static void main(String[] args) throws ClassNotFoundException {
        Class<?> concreteClass = ConcreteClass.class;
        concreteClass = new ConcreteClass(5).getClass();
        try {
            // below method is used most of the times in frameworks like JUnit,
            // Spring dependency injection, Tomcat web container,
            // Eclipse auto completion of method names, hibernate, Struts2 etc.
            // because ConcreteClass is not available at compile time
            concreteClass = Class.forName("com.fred.app.ConcreteClass");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        System.out.println(concreteClass.getCanonicalName()); // prints com.fred.app.ConcreteClass

        // for primitive types, wrapper classes and arrays
        Class<?> booleanClass = boolean.class;
        System.out.println(booleanClass.getCanonicalName()); // prints boolean

        Class<?> cDouble = Double.TYPE;
        System.out.println(cDouble.getCanonicalName()); // prints double

        Class<?> cDoubleArray = Class.forName("[D");
        System.out.println(cDoubleArray.getCanonicalName()); //prints double[]

        Class<?> twoDStringArray = String[][].class;
        System.out.println(twoDStringArray.getCanonicalName()); // prints java.lang.String[][]
    }
}
```
