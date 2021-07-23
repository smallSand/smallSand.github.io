---
layout:  post
title:  "最近面试被问到的一些问题"
date:    2021-07-23
excerpt: "最近经历了几场面试，记录下面试中被问到的一些问题，也算是对知识的一个巩固吧"
categories:  面试
comments: false
---

# Java项目启动后，CPU直接占用100%，怎么排查问题

CPU直接占用100%，大部分原因是因为死循环导致的，现在问题就是如何定位到死循环的代码

排查步骤 ：

## 1.找到占用CPU高的进程ID 

通过top命令可以查到时哪个进程占用了过多的CPU资源
![](https://smallsand.github.io/image/2018081008001.png)

可以看出PID 733进程 的占用CPU 172%

## 2.定位这个线程中占用CPU过高的进程ID

ps -mp 【进程ID PID】 -o THREAD,tid,time

ps -mp 733 -o THREAD,tid,time | sort -rn
![](https://smallsand.github.io/image/2018081008002.png)

查找进程733下的线程 可以看到TID 线程775占用了96%且持有了很长时间 其实到这一步基本上能猜测到应该是 肯定是有段代码发生了死循环


## 3.把TID转换为16进制

printf “%x” 【线程ID TID】

printf "%x\n" 775
![](https://smallsand.github.io/image/2018081008003.png)


## 4.打印线程的堆栈信息 到了这一步具体看堆栈的日志来定位问题了

 jstack 【进程ID PID】 | grep 【线程ID十六进制】 -A 10 -B 10
 jstack 733 |grep 307 -A 30
 ![](https://smallsand.github.io/image/2018081008004.png)
 
 通过堆栈可以定位找到对应的代码位置，通过分析代码可以找到死循环的原因
  ![](https://smallsand.github.io/image/2018081008006.png)



