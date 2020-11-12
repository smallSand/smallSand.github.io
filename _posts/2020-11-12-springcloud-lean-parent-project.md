---
layout:  post
title:  "SpringCloud学习笔记之父工程的搭建"
date:    2020-10-26
excerpt: "最近微服务架构体系挺火的，从招聘网站上看对Java工程师的要求中都加入了有SpringCloud项目经验，熟悉SpringCloud的要求，所以打算利用空余时间记录下SpringCloud学习的过程"
categories:  SpringCloud
comments: false
---

# SpringCloud介绍
SpringCloud是一个微服务架构解决方案的全家桶，里面集成了微服务架构所需要的全部组件，包括服务注册，服务调用，服务降级，服务网关，配置中心等重要组件

## 服务注册
spring提供了实现 Spring Eureka Server,可惜这个项目已经进入维护阶段了，代码停止更新，所以出现了替代方案Zoopkeper,也可以代替 Spring Eureka Server服务注册中心，实现服务注册和治理的功能。当然还有几个服务注册中心的实现，例如Spring Cloud Consul和Alibaba的nacos 都是不错的选择。

## 服务调用

restTemplate 和 openfeign

## 服务降级

hystrix

### 服务降级

### 服务熔断

### 服务限流


## 服务网关

nacos

## 配置中心

Spring Cloud Config

# 搭建父工程

因为springcloud 是有一个个的小功能模块组成，每个模块都可以作为一个独立的server运行，所以每一个模块都是一个springboot搭建的工程，模块与模块之间通过restful api通信，所以我们需要建立一个父工程，管理公共的依赖，后面建立的一个个的小模块，都应该继承我们的父工程，并且属于父工程的一个子模块

## 版本选择

springcloud使用伦敦的街道作为版本号，我使用了最新的 Hoxton.SR8版本，通过官网的解释，这个版本对应的springboot版本为2.3.4.RELEASE

## pom.xml

{% highlight XML %}
	
	<?xml version="1.0" encoding="UTF-8"?>
	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	  <modelVersion>4.0.0</modelVersion>
	  <groupId>com.ptisd</groupId>
	  <artifactId>basicenv</artifactId>
	  <version>${version}</version>
	  <packaging>pom</packaging>
	  
	  <properties>
	  	<version>0.0.1-SNAPSHOT</version>
	  	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
	  	<maven-jar-plugin.version>3.1.1</maven-jar-plugin.version>
	  </properties>
	  
	  <parent>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-parent</artifactId>
			<version>2.3.4.RELEASE</version>
		</parent>

	  <dependencyManagement>
			<dependencies>
				<dependency>
					<groupId>org.springframework.cloud</groupId>
					<artifactId>spring-cloud-dependencies</artifactId>
					<version>Hoxton.SR8</version>
					<type>pom</type>
					<scope>import</scope>
				</dependency>
			</dependencies>
		</dependencyManagement>
	  <dependencies>
	  <dependency>
	      <groupId>junit</groupId>
	      <artifactId>junit</artifactId>
	      <scope>test</scope>
	    </dependency>
	  </dependencies>
	  <build>
			<plugins>
				<plugin>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-maven-plugin</artifactId>
				</plugin>
			</plugins>
		</build>
	</project>
	

{% endhighlight XML %}


