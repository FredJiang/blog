---
title: shiro login
date: 2018-10-29 15:42:53
tags: [shiro, java, password]
---


```java
package org.apache.shiro.authc.pam;

public class ModularRealmAuthenticator extends AbstractAuthenticator {

protected AuthenticationInfo doSingleRealmAuthentication(Realm realm, AuthenticationToken token) {

protected AuthenticationInfo doMultiRealmAuthentication(Collection<Realm> realms, AuthenticationToken token) {

info = realm.getAuthenticationInfo(token);
```

<!--more-->

```java
package org.apache.shiro.realm;

public abstract class AuthenticatingRealm extends CachingRealm implements Initializable {

public final AuthenticationInfo getAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
```