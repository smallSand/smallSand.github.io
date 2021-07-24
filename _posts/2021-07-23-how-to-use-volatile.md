---
layout:  post
title:  "Volatile 关键字的使用"
date:    2021-07-23
excerpt: "在多线程的环境中，经常会使用一些同步机制，volatile关键字可以说是Java虚拟机提供的最轻量级的同步机制"
categories:  面试
comments: false
---

# 概述

在多线程的环境中，经常会使用一些同步机制，比如使用synchronized来控制多个线程对共享资源的访问，但是synchronized是属于比较重量级的同步方式，某些场景下使用显得杀鸡用牛刀，volatile关键字是Java虚拟机提供的最轻量级的同步机制，由于volatile关键字与Java内存模型（Java Memory Model，JMM）有较多的关联，因此在介绍volatile关键字前我们会先介绍下Java内存模型

# Java内存模型（JMM）

JMM规定了内存主要划分为主内存和工作内存两种。此处的主内存和工作内存跟JVM内存划分（堆、栈、方法区）是在不同的层次上进行的，如果非要对应起来，主内存对应的是Java堆中的对象实例部分，工作内存对应的是栈中的部分区域，从更底层的来说，主内存对应的是硬件的物理内存，工作内存对应的是寄存器和高速缓存。

![](https://smallsand.github.io/image/20210723152317.png)

JVM在设计时候考虑到，如果JAVA线程每次读取和写入变量都直接操作主内存，对性能影响比较大，所以每条线程拥有各自的工作内存，工作内存中的变量是主内存中的一份拷贝，线程对变量的读取和写入，直接在工作内存中操作，而不能直接去操作主内存中的变量。但是这样就会出现一个问题，当一个线程修改了自己工作内存中变量，对其他线程是不可见的，会导致线程不安全的问题。因为JMM制定了一套标准来保证开发者在编写多线程程序的时候，能够控制什么时候内存会被同步给其他线程。

# 并发编程中的三个概念

## 1.原子性

原子性：即一个操作或者多个操作 要么全部执行并且执行的过程不会被任何因素打断，要么就都不执行。

一个很经典的例子就是银行账户转账问题：

比如从账户A向账户B转1000元，那么必然包括2个操作：从账户A减去1000元，往账户B加上1000元。

试想一下，如果这2个操作不具备原子性，会造成什么样的后果。假如从账户A减去1000元之后，操作突然中止。然后又从B取出了500元，取出500元之后，再执行 往账户B加上1000元 的操作。这样就会导致账户A虽然减去了1000元，但是账户B没有收到这个转过来的1000元。

所以这2个操作必须要具备原子性才能保证不出现一些意外的问题。

## 2.可见性

可见性是指当多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即看得到修改的值。

## 3.有序性

有序性：即程序执行的顺序按照代码的先后顺序执行。举个简单的例子，看下面这段代码：

{% highlight java %}

	int k = 0; 
	int j = 1  
	k = 5; //代码1
	j = 6; //代码2
	
{% endhighlight java %}

按照有序性的规定，该例子中的代码1应该在代码2之前执行，但是实际上真的是这样吗？

答案是否定的，JVM并不保证上面这个代码1和代码2的执行顺序，因为这两行代码并没有数据依赖性，先执行哪一行代码，最终的执行结果都不会改变，因此，JVM可能会进行指令重排序。

Java语言提供了volatile和synchronized两个关键字来保证线程之间操作的有序性，volatile关键字本身就包含了禁止指令重排序的语义，而synchronized则是由“一个变量在同一个时刻只允许一条线程对其进行lock操作”这条规则获得的，这条规则决定了持有同一个锁的两个同步块只能串行地进入。

介绍完并发中3种重要的特性后，我们发现synchronized关键字在需要这3种特性的时候都可以作为其中一种的解决方案，看起来很“万能”。的确，大部分的并发控制操作都能使用synchronized来完成。synchronized的“万能”也间接造就了它被程序员滥用的局面，越“万能”的并发控制，通常会伴随着越大的性能影响。


# voliate关键字的作用

## 保证可见性

{% highlight java %}

	public class VolatileTest {
	
		//volatile
		public static int num = 0;
	
		public static void main(String[] args) {
			new Thread(new Runnable() {
				@Override
				public void run() {
					//线程1
					try {
						Thread.sleep(1000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					num = 10;
				}
			}).start();
	
			//线程2
			while(num == 0){
			}
			System.out.println(num);
		}
	}
	
{% endhighlight java %}

在主内存中存在静态变量num=0, 线程1和线程2在各自的工作内存中都存在num变量的副本,初始值都为0，线程1开始执行,一秒以后把num改成10，线程2执行，判断num是不是等于0，因为线程1改变了num的值，并写回主内存，但是对于线程2来说并不知道主内存中的num发生了改变，线程2工作内存中的num依然等于0
，所以线程2不会结束，也不会打印num的值

解决方案 ： 在num上面加上volatile关键字修饰

在num上面加上volatile关键字修饰可以保证在线程1改变num值的时候马上通知线程2刷新num的值为，保证了num变量在线程1和线程2的可见性

## 不保证原子性

{% highlight java %}

	public class VolatileTest {
	
		public static volatile int num = 0;
	
		public static void main(String[] args) {
			
			for(int i = 1 ; i <= 100 ; i ++){
				new Thread(new Runnable() {
					@Override
					public void run() {
						for(int i = 1 ; i <= 100 ; i ++){
							num++;
						}
					}
				}).start();
			}
			while(Thread.activeCount() > 1){
				Thread.yield();
			}
			System.out.println(num);//不是10000，num++ 对应的是三个操作，因为volatile不能保证原子性，所以不能保证三个操作同时成功
		}
	}
	
{% endhighlight java %}

打印结果小于等于10000，问题就出现在自增运算num++之中，通过Javap反编译这段代码后会发现只有一行代码的num++其实由4条字节码指令构成的，因为volatile不能保证原子性，所以不能保证4条字节码指令同时成功

解决方案 ： 使用AtomicInteger

从这个例子我们可以确定volatile是不能保证原子性的，要保证运算的原子性可以使用java.util.concurrent.atomic包下的一些原子操作类。例如最常见的： AtomicInteger。

## 禁止指令重排

# volatile的使用场景

## 状态标记量

使用volatile来修饰状态标记量，使得状态标记量对所有线程是实时可见的，从而保证所有线程都能实时获取到最新的状态标记量，进一步决定是否进行操作。例如常见的促销活动“秒杀”，可以用volatile来修饰“是否售罄”字段，从而保证在并发下，能正确的处理商品是否售罄。

{% highlight java %}

	volatile boolean flag = false;
	while (!flag) {
	    doSomething();
	}
	public void setFlag() {
	    flag = true;
	}
	
{% endhighlight java %}

## 双重检测机制实现单例(DCL)

{% highlight java %}

	/*
	 * 
	 * DCL 实现单例模式
	 */
	public class Singleton {
		//私有化构造函数
		private Singleton(){};
		//volatile修饰单例对象
		private static volatile Singleton instance;
		public static Singleton getInstance(){
			if(instance == null){//第一次检测
				synchronized (Singleton.class) {//同步锁
					if(instance == null){//第二次检测
						instance = new Singleton();//实例化
					}
				}
			}
			return instance;
		}
	}
	
{% endhighlight java %}

# 总结

- 每个Java线程都有自己的工作内存，工作内存中的数据并不会实时刷新回主内存，因此在并发情况下，有可能线程A已经修改了成员变量k的值，但是线程B并不能读取到线程A修改后的值，这是因为线程A的工作内存还没有被刷新回主内存，导致线程B无法读取到最新的值。

- 在工作内存中，每次使用volatile修饰的变量前都必须先从主内存刷新最新的值，这保证了当前线程能看见其他线程对volatile修饰的变量所做的修改后的值。

- 在工作内存中，每次修改volatile修饰的变量后都必须立刻同步回主内存中，这保证了其他线程可以看到自己对volatile修饰的变量所做的修改。

- volatile修饰的变量不会被指令重排序优化，保证代码的执行顺序与程序的顺序相同。

- volatile保证可见性，不保证原子性，部分保证有序性（仅保证被volatile修饰的变量）。

- 指令重排序的目的是为了提高性能，指令重排序仅保证在单线程下不会改变最终的执行结果，但无法保证在多线程下的执行结果。

- 为了实现volatile的内存语义，编译器在生成字节码时，会在指令序列中插入内存屏障来禁止重排序。


