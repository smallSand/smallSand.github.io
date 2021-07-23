---
layout:  post
title:  "Mybatis流式查询"
date:    2021-07-23
excerpt: "Mybatis流式查询的使用场景和使用示例"
categories:  面试 Mybatis
comments: false
---

# 基本概念

流式查询指的是查询成功后不是返回一个集合而是返回一个迭代器，应用每次从迭代器取一条查询结果。流式查询的好处是能够降低内存使用。

如果没有流式查询，我们想要从数据库取 1000 万条记录而又没有足够的内存时，就不得不分页查询，而分页查询效率取决于表设计，如果设计的不好，就无法执行高效的分页查询。因此流式查询是一个数据库访问框架必须具备的功能。

流式查询的过程当中，数据库连接是保持打开状态的，因此要注意的是：执行一个流式查询后，数据库访问框架就不负责关闭数据库连接了，需要应用在取完数据后自己关闭。

# MyBatis 流式查询接口

MyBatis 提供了一个叫 org.apache.ibatis.cursor.Cursor 的接口类用于流式查询，这个接口继承了 java.io.Closeable 和 java.lang.Iterable 接口，由此可知：

1、Cursor 是可关闭的；

2、Cursor 是可遍历的。

除此之外，Cursor 还提供了三个方法：

1、isOpen()：用于在取数据之前判断 Cursor 对象是否是打开状态。只有当打开时 Cursor 才能取数据；

2、isConsumed()：用于判断查询结果是否全部取完。

3、getCurrentIndex()：返回已经获取了多少条数据


# 示例

{% highlight java %}

	public interface ChatDao {
	
		//流式查询
		public Cursor<VoHelp> streamQuery();
	
	}	
	
{% endhighlight java %}

{% highlight xml %}

	<?xml version="1.0" encoding="UTF-8" ?>
	<!DOCTYPE mapper
	  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
	  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
	<mapper namespace="com.pti.mybatis.test.chat.ChatDao">
		<resultMap id="voHelpMap" type="com.pti.mybatis.test.chat.VoHelp">
			<id column="ID" property="id" jdbcType="BIGINT" />
			<result column="SECTION" property="section" jdbcType="VARCHAR" />
			<result column="SECTION" property="section" jdbcType="VARCHAR" />
			<result column="SYNTAX" property="syntax" jdbcType="VARCHAR" />
			<result column="TEXT" property="text" jdbcType="VARCHAR" />
		</resultMap>
	
		<select id="streamQuery" resultMap="voHelpMap">
			SELECT * FROM INFORMATION_SCHEMA.help
		</select>
	</mapper>	
	
{% endhighlight xml %}

{% highlight java %}

	public class App {
	
		private SqlSession session;
		SqlSessionFactory sqlSessionFactory;
		@Before
		public void init() {
			try {
				String resource = "mybatis-config.xml";
				URL url = Resources.getResourceURL(resource);
				System.out.println(url.getPath());
				InputStream inputStream = Resources.getResourceAsStream(resource);
				sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream, "h2test");
				session = sqlSessionFactory.openSession();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		@Test
		public void testSelect(){
			ChatDao mapper = session.getMapper(ChatDao.class);
			Cursor<VoHelp> cursor = mapper.streamQuery();
			cursor.forEach(vo -> {
				System.out.println(cursor.isOpen());
				System.out.println(vo.getSection());
			});
		}
		@After
		public void destroy(){
			session.close();
		}
	}	
	
{% endhighlight java %}



