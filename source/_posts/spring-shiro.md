---
title: spring shiro
date: 2018-09-21 17:57:18
tags: [spring, shiro, java]
---

* <https://www.baeldung.com/apache-shiro>
* <https://waylau.com/apache-shiro-1.2.x-reference/II.%20Core%20%E6%A0%B8%E5%BF%83/5.%20Authentication%20%E8%AE%A4%E8%AF%81.html>
* <https://waylau.com/apache-shiro-1.2.x-reference/index.html>
* <http://shiro.apache.org/index.html>


<!--more-->

### shiro.ini

```
[users]
user = password, admin
user2 = password2, editor
user3 = password3, author
 
[roles]
admin = *
editor = articles:*
author = articles:compose,articles:save
```

`username = password, roleName1, roleName2, ..., roleNameN`

* 等号左边的值是用户名
* 等号右侧第一个值是用户密码，密码是必须的
* 密码之后用逗号分割的值是赋予用户的角色名，角色名是可选的

The [users] section of the shiro.ini config file defines the user credentials that are recognized by the SecurityManager. The format is: principal (username) = password, role1, role2, …, role.

`rolename = permissionDefinition1, permissionDefinition2, ..., permissionDefinitionN`

The roles and their associated permissions are declared in the [roles] section. The admin role is granted permission and access to every part of the application. This is indicated by the wildcard (*) symbol.

The editor role has all permissions associated with articles while the author role can only compose and save an article.

The SecurityManager is used to configure the SecurityUtils class. From the SecurityUtils we can obtain the current user interacting with the system and perform authentication and authorization operations.

We create an authentication token with the user’s principal (username) and credential (password).



### Subject 验证的过程

1. 收集 Subject 提交的身份和证明

```java
UsernamePasswordToken token = new UsernamePasswordToken(username, password);
token.setRememberMe(true);
```

2. 向 Authentication 提交身份和证明

```java
Subject currentUser = SecurityUtils.getSubject();
currentUser.login(token);
```

3. 如果提交的内容正确，允许访问，否则重新尝试验证或阻止访问

```java
try {
    currentUser.login(token);
} catch ( UnknownAccountException uae ) { ...
} catch ( IncorrectCredentialsException ice ) { ...
} catch ( LockedAccountException lae ) { ...
} catch ( ExcessiveAttemptsException eae ) { ...
} ... 捕获你自己的异常 ...
} catch ( AuthenticationException ae ) {
    //未预计的错误?
}
```

已记住（Remembered）和已验证（Authenticated）是互斥的：一个标识值为真另一个就为假，反过来也一样。

### Authentication Sequence

{% asset_img "ShiroAuthenticationSequence.png" "" %}

第1步：程序代码调用 Subject.login 方法，向AuthenticationToken（认证令牌）实例的构造函数传递用户的身份和证明。

第2步：Subject 实例，通常是一个 DelegatingSubject（或其子类）通过调用 securityManager.login(token )将这个令牌转交给程序的 SecurityManager。

第3步：SecurityManager，基本的“安全伞”组件，得到令牌并通过调用 authenticator.authenticate(token))简单地将其转交它内部的 Authenticator 实例，大部分情况下是一个 ModularRealmAuthenticator 实例，用来支持在验证过程中协调一个或多个Realm实例。ModularRealmAuthenticator 本质上为 Apache Shiro（在 PAM 术语中每一个 Realm 称为一个“模块”）提供一个 PAM 类型的范例。

第4步：如程序配置了多个 Realm，ModularRealmAuthenticator实例将使用其配置的 AuthenticationStrategy 开始一个 多 Realm 身份验证的尝试。在 Realm 被验证调用的整个过程中，AuthenticationStrategy（安全策略）被调用用来回应每个Realm结果，我们将稍后讨论 AuthenticationStrategies。

注意：单 Realm 程序

如果仅有一个 Realm 被配置，它直接被调用--在单 Realm 程序中不需要AuthenticationStrategy。

第5步：每一个配置的 Realm 都被检验看其是否支持)提交的AuthenticationToken，如果支持，则该 Realm 的 getAuthenticationInfo) 方法随着提交的牌被调用，getAuthenticationInfo 方法为特定的 Realm 有效提供一次独立的验证尝试，我们将稍后讨论 Realm 验证行为。


### Authorizing Subjects

在 Shiro 中执行授权可以有三种途径：

* 程序代码--你可以在你的 JAVA 代码中执行用类似于 if 和 else 的结构来执行权限检查
* JDK 注解--你可以在你的 JAVA 方法上附加权限注解
* JSP/GSP 标签--你可以基于角色和权限控制 JSP 或 GSP 页面输出内容


### Authorization Sequence

{% asset_img "ShiroAuthorizationSequence.png" "" %}

第1步：程序或框架代码调用一个 Subject 的hasRole*、checkRole*、 isPermitted*或者 checkPermission*方法，传递所需的权限或角色。

第2步：Subject实例，通常是一个 DelegatingSubject（或子类），通过调用securityManager 与各 hasRole*、checkRole*、 isPermitted* 或 checkPermission* 基本一致的方法将权限或角色传递给程序的 SecurityManager(实现了 org.apache.shiro.authz.Authorizer 接口)

第3步：SecurityManager 作为一个基本的“保护伞”组件,接替/代表其内部 org.apache.shiro.authz.Authorizer 实例通过调用 authorizer 的各自的 hasRole*, checkRole* , isPermitted* ,或 checkPermission* 方法。 authorizer 默认情况下是一个实例 ModularRealmAuthorizer 支持协调一个或多个实例 Realm 在任何授权操作实例。

第4步:，检查每一个被配置的 Realm 是否实现相同的 Authorizer接口，如果是，Realm 自己的各 hasRole*、checkRole*、 isPermitted* 或 checkPermission* 方法被调用。

### Realms

Realm 是可以访问程序特定的安全数据如用户、角色、权限等的一个组件。Realm 会将这些程序特定的安全数据转换成一种 Shiro 可以理解的形式，Shiro 就可以依次提供容易理解的 Subject 程序API而不管有多少数据源或者程序中你的数据如何组织。

Realm 实质上就是一个特定安全的 DAO

<https://waylau.com/apache-shiro-1.2.x-reference/VII.%20Index%20%E7%9B%AE%E5%BD%95/19.%20Terminology%20%E6%9C%AF%E8%AF%AD.html>

```java
org.apache.shiro.realm.jdbc.JdbcRealm
org.apache.shiro.authc.credential.HashedCredentialsMatcher
```
