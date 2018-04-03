---
title: gradle 使用
date: 2017-12-29 18:00:29
tags: [gradle, java]
---

cat build.gradle

<!--more-->

```
apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'application'

mainClassName = 'com.mycompany.app.App'

// tag::repositories[]
repositories {
    mavenLocal()
    mavenCentral()
}
// end::repositories[]

// tag::jar[]
jar {
    baseName = 'gs-gradle'
    version =  '0.1.0'
}
// end::jar[]

// tag::dependencies[]
dependencies {
    compile "joda-time:joda-time:2.2"
}
// end::dependencies[]

// tag::wrapper[]
task wrapper(type: Wrapper) {
    gradleVersion = '1.11'
}
// end::wrapper[]
```

```
gradle clean && \
gradle build && \
gradle wrapper && \
./gradlew build && \
./gradlew run
```