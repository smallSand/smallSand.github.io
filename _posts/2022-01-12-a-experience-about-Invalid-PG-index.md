---
layout:  post
title:  "索引失效案例"
date:    2022-01-12
excerpt: "最近在做数据迁移时候发现的一次索引失效..."
categories:  数据库 索引
comments: false
---
# 问题SQL

> select * from table_name where id = 315224456232497152::numeric;

id是int8类型,如果用BigDecimal作为输入参数导致索引失效


