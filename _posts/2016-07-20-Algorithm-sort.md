---
layout:  post
title:  "排序算法"
date:    2016-07-20
excerpt: "记录排序算法和对应的java实现"
categories:  算法 笔记
comments: true
---

# 冒泡排序（bubble）

冒泡排序（`Bubble Sort`），是一种计算机科学领域的较简单的排序算法。

它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。

这个算法的名字由来是因为越大的元素会经由交换慢慢“浮”到数列的顶端，故名。

![](http://sml9520.oschina.io/smallsand/image/201111301912294589.gif)

## 算法原理

冒泡排序算法的运作如下：（从后往前）

1.比较相邻的元素。如果第一个比第二个大，就交换他们两个。

2.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。

3.针对所有的元素重复以上的步骤，除了最后一个。

4.持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

## java实现

{% highlight java %}
public class BubbleSort
{
    public void sort(int[] a)
    {
        int temp = 0;
        for (int i = a.length - 1; i > 0; --i)
        {
            for (int j = 0; j < i; ++j)
            {
                if (a[j + 1] < a[j])
                {
                    temp = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = temp;
                }
            }
        }
    }
}
{% endhighlight %}

# 选择排序(Selection sort)

选择排序（`Selection sort`）是一种简单直观的排序算法。它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，直到全部待排序的数据元素排完。 选择排序是不稳定的排序方法（比如序列[5， 5， 3]第一次就将第一个[5]与[3]交换，导致第一个5挪动到第二个5后面）。

## 基本思想

选择类排序（包括简单选择排序、树形选择排序和堆排序等）的基本算法思想是执行第i趟操作时，从第i条记录后选择一条最小的记录和第i条记录交换。

初始状态： 49 38 65 97 76 13 27

第一趟： 从（38 65 97 76 13 27）中选择最小值13与49交换

13 38 65 97 76 49 27

第二趟： 从（65 97 76 49 27）中选择最小值27与38交换

13 27 65 97 76 49 38

...

## java实现

{% highlight java %}
public static void selectSort(int[]a)
{
    int minIndex=0;
    int temp=0;
    if((a==null)||(a.length==0))
        return;
    for(int i=0;i<a.length-1;i++)
    {
        minIndex=i;//无序区的最小数据数组下标
        for(intj=i+1;j<a.length;j++)
        {
            //在无序区中找到最小数据并保存其数组下标
            if(a[j]<a[minIndex])
            {
                minIndex=j;
            }
        }
        if(minIndex!=i)
        {
            //如果不是无序区的最小值位置不是默认的第一个数据，则交换之。
            temp=a[i];
            a[i]=a[minIndex];
            a[minIndex]=temp;
        }
    }
}
{% endhighlight %}
