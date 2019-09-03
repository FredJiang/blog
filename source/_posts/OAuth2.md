---
title: OAuth2
date: 2019-05-21 19:56:04
tags: [OAuth2, security]
---

* Spring Microservices in Action
    * 第七章 Securing your microservices

<!--more-->

{% asset_img "1.png" "" %}

OAuth2 is a token-based security authentication and authorization framework that breaks security down into four components. These four components are

* A protected resource: This is the resource (in our case, a microservice) you want to protect and ensure that only authenticated users who have the proper authorization can access.
* A resource owner: A resource owner defines what applications can call their service, which users are allowed to access the service, and what they can do with the service. Each application registered by the resource owner will be given an application name that identifies the application along with an application secret key. The combination of the application name and the secret key are part of the credentials that are passed when authenticating an OAuth2 token.
* An application: This is the application that’s going to call the service on a behalf of a user. After all, users rarely invoke a service directly. Instead, they rely on an application to do the work for them.
* OAuth2 authentication server: The OAuth2 authentication server is the intermediary between the application and the services being consumed. The OAuth2 server allows the user to authenticate themselves without having to pass their user credentials down to every service the application is going to call on behalf of the user.





























