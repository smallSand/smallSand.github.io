---
layout:  post
title:  "&& 和|| 的用法"
date:    2017-04-26
excerpt: "&&(与) 和||(或) 的用法 "
categories:  Java
comments: false
---

&&可以用作逻辑与的运算符，表示逻辑与（and），当运算符两边的表达式的结果都为true时，整个运算结果才为true，否则，只要有一方为false，则结果为false。

&&还具有短路的功能，即如果第搜索一个表达式为false，则不再计算第二个表达式，例如，对于if(str != null && !str.equals(“”))表达

式，当str为null时，后面的表达式不会执行，所以不会出现NullPointerException

丨丨可以作逻辑或运算符，表示逻辑或（or），当运算符有一边为true时，整个运算结果为true！
