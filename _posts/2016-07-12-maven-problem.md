---
layout: post
title:  "maven错误处理记录"
date:   2016-07-12
excerpt: "maven报错处理"
categories:  maven 笔记
comments: true
---

# 问题描述

在通过pom.xml中的依赖坐标,从私服下载依赖包时,往往会遇到如下的类似问题:

`The container 'Maven Dependencies' references non existing library '${groupid}/${artifactid}-${version}.jar'`

# 产生原因

上面问题往往是在下载依赖过程中网络出现问题导致下载中断或者人为中断下载.

此时我们本机已经开始下载依赖代码,但是下载失败,本机仓库中会在

`${MAVEN_repo}/${groupid}/${artifactid}/${version} 路径下面生成 *.lastUpdated 的文件.`

`*.lastUpdated`实在可恶,下次再下载时由于它的存在Maven不会再去私服中下载

# 解决方案

  1. 打开本地仓库所在目录, 通过win文件夹的搜索功能,查找 `*.lastUpdated` ,然后将找到的文件全部删除
  
  2. 重新` Maven Update Project`,在eclipse中操作时勾选上 `Force Update of Snapshots / Releases`
  
一般情况下上面方法即可解决问题. 若问题依然存在,请确认下主机与Maven私服之间网络是否畅通.可以通过在浏览器中打开私服地址确认.

若本机与私服之前网络畅通,那这个问题可能是由于私服与中央仓库(或者其他第三方仓库)之间下载依赖时网络故障导致的.