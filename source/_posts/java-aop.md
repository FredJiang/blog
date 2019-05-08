---
title: java aop
date: 2019-03-06 14:26:43
tags: [java, aop, spring]
---

<https://www.journaldev.com/2583/spring-aop-example-tutorial-aspect-advice-pointcut-joinpoint-annotations>

<!--more-->

core concepts of AOP (Aspect Oriented Programming)

1. Aspect: An aspect is a class that implements enterprise application concerns that cut across multiple classes, such as transaction management. Aspects can be a normal class configured through Spring XML configuration or we can use Spring AspectJ integration to define a class as Aspect using @Aspect annotation.
2. Join Point: A join point is the specific point in the application such as method execution, exception handling, changing object variable values etc. In Spring AOP a join points is always the execution of a method.
3. Advice: Advices are actions taken for a particular join point. In terms of programming, they are methods that gets executed when a certain join point with matching pointcut is reached in the application. You can think of Advices as Struts2 interceptors or Servlet Filters.
4. Pointcut: Pointcut are expressions that is matched with join points to determine whether advice needs to be executed or not. Pointcut uses different kinds of expressions that are matched with the join points and Spring framework uses the AspectJ pointcut expression language.
5. Target Object: They are the object on which advices are applied. Spring AOP is implemented using runtime proxies so this object is always a proxied object. What is means is that a subclass is created at runtime where the target method is overridden and advices are included based on their configuration.
6. AOP proxy: Spring AOP implementation uses JDK dynamic proxy to create the Proxy classes with target classes and advice invocations, these are called AOP proxy classes. We can also use CGLIB proxy by adding it as the dependency in the Spring AOP project.
7. Weaving: It is the process of linking aspects with other objects to create the advised proxy objects. This can be done at compile time, load time or at runtime. Spring AOP performs weaving at the runtime.


```java
@Aspect
public class EmployeeAspectPointcut {
    @Pointcut("execution(public String getName())")
    public void getNamePointcut(){
    }

    @Before("getNamePointcut()")
    public void loggingAdvice(){
        System.out.println("Executing loggingAdvice on getName()");
    }

    @Before("getNamePointcut()")
    public void secondAdvice(){
        System.out.println("Executing secondAdvice on getName()");
    }
}
```

1. We can use JoinPoint as parameter in the advice methods and using it get the method signature or the target object.
2. We can use args() expression in the pointcut to be applied to any method that matches the argument pattern. If we use this, then we need to use the same name in the advice method from where argument type is determined. We can use Generic objects also in the advice arguments.

```java
@Aspect
public class EmployeeAspectJoinPoint {
    @Before("execution(public String setName(*))")
    public void loggingAdvice(JoinPoint joinPoint){
        System.out.println("Before running loggingAdvice on method = " + joinPoint.toString());
        System.out.println("Agruments Passed = " + Arrays.toString(joinPoint.getArgs()));
    }
    
    // Advice arguments, will be applied to bean methods with single String argument
    @Before("args(name)")
    public void secondAdvice(String name){
        System.out.println("String argument passed = " + name);
    }
}
```

1. An alternative approach is to create a custom annotation and annotate the methods where we want the advice to be applied. 

```java
package com.journaldev.spring.aspect;

public @interface Loggable {
}
```

```java
package com.journaldev.spring.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect
public class EmployeeAnnotationAspect {
    @Before("@annotation(com.journaldev.spring.aspect.Loggable)")
    public void myAdvice(){
        System.out.println("Executing myAdvice!!");
    }
}
```

```java
package com.journaldev.spring.model;

import com.journaldev.spring.aspect.Loggable;

public class Employee {
    @Loggable
    public void setName(String nm) {
    }
}
```

