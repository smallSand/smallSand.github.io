---
layout: post
title:  "java文件操作"
date:   2016-07-13
excerpt: "今天使用java File 对象新建目录的时候时遇到的一些问题，记录一下"
categories:  java 笔记
comments: false
---

使用java创建目录有`mkdir()`和`mkdirs()`两种方法,区分下两种方法的区别

# 使用mkdir()创建目录

使用`mkdir()`创建目录一次只能创建一级目录,无法创建多级目录

# 使用mkdirs()创建目录

使用mkdirs()创建目录可以一次创建多级目录

 ```File path =new File("e:/prod/a/b/c/d/");```

 ```path.mkdirs();```
 
 在E盘没有任何目录的情况下，调用下面方法会生成
 
 ![](http://sml9520.oschina.io/smallsand/image/20160713195027.png)