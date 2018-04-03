---
title: spring with Gradle
date: 2018-01-15 08:08:22
tags: [spring, java, gradle]
---

* <https://spring.io/guides/gs/gradle/>
* <https://projects.spring.io/spring-framework/>

<!--more-->

|     命令     |                                                 说明                                                 |
|--------------|------------------------------------------------------------------------------------------------------|
| gradle tasks | Before you even create a build.gradle file for the project, you can ask it what tasks are available. |
| gradle build | This task compiles, tests, and assembles the code into a JAR file.                                   |


|                  命令                 |                                                                说明                                                                |
|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| gradle wrapper --gradle-version 4.4.1 |                                                                                                                                    |
| ./gradlew build                       | The first time you run the wrapper for a specified version of Gradle, it downloads and caches the Gradle binaries for that version |
| ./gradlew run                         | Then you can run the app!                                                                                                          |

cat build.gradle

```
apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'application'

mainClassName = 'hello.HelloWorld'

// tag::repositories[]
repositories {
    // mavenCentral()
    maven {
        url 'http://maven.aliyun.com/nexus/content/groups/public/'
    }
}
// end::repositories[]

// tag::jar[]
jar {
    baseName = 'gs-gradle'
    version =  '0.1.0'
}
// end::jar[]

// tag::dependencies[]
sourceCompatibility = 1.8
targetCompatibility = 1.8

dependencies {
    compile "joda-time:joda-time:2.2"
    testCompile "junit:junit:4.12"
}
// end::dependencies[]

// tag::wrapper[]
// end::wrapper[]
```


