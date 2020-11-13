---
layout:  post
title:  "SpringCloud学习笔记之注册中心"
date:    2020-10-26
excerpt: "本案例使用Spring Cloud Eureka作为注册中心实现"
categories:  SpringCloud
comments: false
---

# 创建注册中心模块

选中父工程->右键->Maven->New Maven Module Project
artifactId : sping-eureka-server

## 改pom.xml

{% highlight XML %}
	
	<?xml version="1.0" encoding="utf-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<artifactId>sping-eureka-server</artifactId>
	<version>>${version}</version>
	<packaging>jar</packaging>
	<name>sping-eureka-server</name>
	<url>http://maven.apache.org</url>
	
	<parent>
		<groupId>com.ptisd</groupId>
		<artifactId>basicenv</artifactId>
		<version>0.0.1-SNAPSHOT</version>
	</parent>
	<dependencies>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>
	</dependencies>
</project>

{% endhighlight XML %}

## 创建application.yml

{% highlight yml %}
	
	server:
	  port: 3000
	spring:
	  application:
	    name: spring-eureka-center
	  security:
	      user:
	        name: test  # 用户名
	        password: 123456   # 密码
	  cloud:
	    inetutils: ## 网卡设置
	      ignoredInterfaces:  ## 忽略的网卡
	        - docker0
	        - veth.*
	        - VM.*
	      preferredNetworks:  ## 优先的网段
	        - 192.168
	eureka:
	  instance:
	    hostname: eureka-center
	    appname: spring-eureka-center
	  client:
	    registerWithEureka: false # 单点的时候设置为 false 禁止注册自身
	    fetchRegistry: false
	    serviceUrl:
	      defaultZone: http://test:123456@localhost:3000/eureka
	  server:
	    enableSelfPreservation: false
	    evictionIntervalTimerInMs: 4000

{% endhighlight yml %}

## 创建主启动类

@EnableEurekaServer注明表示这是一个EurekaServer

{% highlight java %}
	
	package com.ptisd.sping.eureka.server;
	import org.springframework.boot.SpringApplication;
	import org.springframework.boot.autoconfigure.SpringBootApplication;
	import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
	import org.springframework.security.config.annotation.web.builders.HttpSecurity;
	import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
	import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
	
	@EnableEurekaServer
	@SpringBootApplication
	public class SpingEurekaServerMain3000 {
	
	    public static void main(String[] args) {
	        SpringApplication.run(SpingEurekaServerMain3000.class, args);
	    }
	    
	    @EnableWebSecurity
	    public class WebSecurityConfigurer extends WebSecurityConfigurerAdapter {
	        @Override
	        protected void configure(HttpSecurity http) throws Exception {
	            http.csrf().disable();
	            super.configure(http);
	        }
	    }
	}

{% endhighlight java %}



