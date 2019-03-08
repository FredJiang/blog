---
title: spring message converters
date: 2019-01-02 09:58:28
tags: [spring, java]
---

StringHttpMessageConverter

```xml
    <mvc:annotation-driven>
        <mvc:message-converters>
            <bean class="org.springframework.http.converter.StringHttpMessageConverter">
                <property name="supportedMediaTypes">
                    <list>
                        <value>text/plain;charset=UTF-8</value>
                    </list>
                </property>
            </bean>
            <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
                <property name="objectMapper">
                    <bean class="com.fasterxml.jackson.databind.ObjectMapper">
                        <!--<property name="serializationInclusion" value="NON_NULL"/>-->
                        <property name="serializationInclusion">
                            <util:constant
                                    static-field="com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL"/>
                        </property>
                    </bean>
                </property>
                <property name="supportedMediaTypes">
                    <list>
                        <value>text/plain;charset=UTF-8</value>
                        <!--<value>application/json;charset=UTF-8</value>-->
                    </list>
                </property>
            </bean>
        </mvc:message-converters>
    </mvc:annotation-driven>
```

FastJsonHttpMessageConverter

```xml
    <mvc:annotation-driven>
        <mvc:message-converters>
            <bean class="com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter">
                <property name="supportedMediaTypes">
                    <list>
                        <value>text/html;charset=UTF-8</value>
                        <value>application/json;charset=UTF-8</value>
                    </list>
                </property>
                <!--<property name="features">-->
                <!--<list>-->
                <!--<value>WriteMapNullValue</value>-->
                <!--<value>QuoteFieldNames</value>-->
                <!--<value>WriteDateUseDateFormat</value>-->
                <!--</list>-->
                <!--</property>-->
                <property name="fastJsonConfig">
                    <bean class="com.alibaba.fastjson.support.config.FastJsonConfig">
                        <property name="serializerFeatures">
                            <list>
                                <!--<value>WriteMapNullValue</value>-->
                                <!--<value>QuoteFieldNames</value>-->
                                <!--<value>WriteDateUseDateFormat</value>-->
                            </list>
                        </property>
                    </bean>
                </property>
            </bean>
        </mvc:message-converters>
    </mvc:annotation-driven>
```