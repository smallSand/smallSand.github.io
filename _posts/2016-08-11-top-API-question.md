---
layout:  post
title:  "Stack Overflow 上排名前十的与API相关的问题"
date:    2016-08-11
excerpt: "从program greek 翻译 "
categories:  笔记 翻译
comments: true
---
[原文链接](http://www.programcreek.com/2015/12/top-10-api-related-questions-from-stack-overflow)

Stack Overflow是一个庞大的编程知识仓库,在Stack Overflow 上，数百万的提问被回答，并且这些回答都是高质量的。这就是为什么在Google搜索结果的排行榜上,Stack Overflow 总是位居首位。

虽然Stack Overflow上有非常多的提问，但是仍然每天都有大量的问题被提出，其中的很多都等待解答或者没有得到好的解答。因此，问题是如何找到答案的，通过Stack Overflow是不够的。

随着成千上万的开发者使用Java的API并且在Github上分享他们的项目，这些项目可以提供很多很好的例子来展示如何使用Java的API。[Java API Example](http://www.programcreek.com/java-api-examples/index.php)是一个提供常用Java API代码示例搜索的入口

在这篇文章中，我将会探索只通过开源的代码(jExample)能否解决投票前几名的API相关问题。“API相关的问题”指的是如何通过一些API来解决一个任务的问题。Stack Overflow上投票靠前的问题在[http://stackoverflow.com/questions/tagged/java](http://stackoverflow.com/questions/tagged/java)可以找到

对于每一个问题，最好的回答首先会被展示，随后通过Java API examples(jExample)的解决方案也会图文并茂的展示。


# 遍历一个HashMap 

被接受的回答：

{% highlight java %}

    Map<String, Object> map = ...; 
    for (String key : map.keySet()) { 
     // ... 
    }
    
{% endhighlight java %}

如果我们在jExample搜索“HashMap”，前往java.util.HashMap示例页面。然后点击其中一个最常用的方法-entrySet()，我们就能快速的如下的示例：

{% highlight java %}

	HashMap<BigInteger,R> subMap = rowie.getValue();
	for( Entry<BigInteger, R> colie : subMap.entrySet() )
	{
		BigInteger col = colie.getKey();
		R vali = colie.getValue();
		ret.setVal(row, col, mutr.mutate( vali ) );
	}
	
{% endhighlight java %}

这个例子展示了如何通过使用`HashMap.entrySet(),Entry.getKey()`和`Entry.getValue()`去迭代循环去遍历一个HashMap

Links: [HashMap.entrySet()](http://www.programcreek.com/java-api-examples/index.php?class=java.util.HashMap&method=entrySet)


# 通过一个数组创建一个`ArrayList`

对于这个问题，有多个回答提供了很多方式。这里是一些排名前三的方法：

{% highlight java %}

    // Method 1
    new ArrayList<Element>(Arrays.asList(array))
    // Method 2
    ImmutableList.of("string", "elements");
    // Method 3
    List<String> l1 = Lists.newArrayList(anotherListOrCollection);
    
{% endhighlight java %}

以上的三个方法可以通过`jExample1找到

Method 1:

{% highlight java %}

    List<String> updatedLikedAddresses = new ArrayList<>(Arrays.asLi(likedAddresses));
    
{% endhighlight java %}

Method 2:

{% highlight java %}

    List<String> portions = ImmutableList.of(serviceName,version,callStyle.name())
    
{% endhighlight java %}

Method 3:

{% highlight java %}

    List<Object> result = Lists.newArrayList();
	for(Class<?> aClass : classes){
		result.add(new Object[] {aclass})
	}
	
{% endhighlight java %}

# 如何在一个范围内生成碎随机数？

被接受的来自回答的解决方法：

{% highlight java %}

    int randomNum = rand.nextInt((max - min) + 1) + min;
    
{% endhighlight java %}

# 如何将一个字符串转换成整型

最好的答案

{% highlight java %}

    int foo = Integer.parseInt("1234");
    
{% endhighlight java %}

# 如何将字节流转换成字节数组

被采纳的回答

{% highlight java %}

    InputStream is; 
    byte[] bytes = IOUtils.toByteArray(is);
    
{% endhighlight java %}

# 如何生成一个`MD5`散列

可以使用`MessageDigest`

{% highlight java %}

    public static String getMD5Digest(String str) {
	try {
		byte[] buffer = str.getBytes();
		byte[] result = null;
		StringBuffer buf = null;
		MessageDigest md5 = MessageDigest.getInstance("MD5");
		// allocate room for the hash
		result = new byte[md5.getDigestLength()];
		// calculate hash
		md5.reset();
		md5.update(buffer);
		result = md5.digest();
		// System.out.println(result);
		// create hex string from the 16-byte hash
		buf = new StringBuffer(result.length * 2);
		for (int i = 0; i < result.length; i++) {
			int intVal = result[i] & 0xff;
			if (intVal < 0x10) {
				buf.append("0");
			}
			buf.append(Integer.toHexString(intVal).toUpperCase());
		}
		return buf.toString();
	} catch (NoSuchAlgorithmException e) {
		System.err.println("Exception caught: " + e);
		e.printStackTrace();
	}
	return null;
    }
    
{% endhighlight java %}

# 在java中如何创建一个文件并向文件中写入内容

方法一

{% highlight java %}
    PrintWriter writer = new PrintWriter("the-file-name.txt", "UTF-8");       
    writer.println("The first line"); 
    writer.println("The second line"); 
    writer.close();
{% endhighlight java %}
    
方法 2

{% highlight java %}
    List<String> lines = Arrays.asList("The first line", "The second line"); 
    Path file = Paths.get("the-file-name.txt"); 
    Files.write(file, lines, Charset.forName("UTF-8"));
{% endhighlight java %}
 
# 在java中从文本文件读取内容的最好方法

{% highlight java %}

    BufferedReader br = new BufferedReader(new FileReader("file.txt")); 
    try {
       StringBuilder sb = new StringBuilder();
       String line = br.readLine();
       while (line != null) {
      sb.append(line);
      sb.append(System.lineSeparator());
      line = br.readLine(); 
       } 
       String everything = sb.toString(); 
    } finally { 
       br.close(); 
    }
    
{% endhighlight java %}

# 如何将java.util.Date转换成XMLGregorianCalendar

被接受的回答：

{% highlight java %}

    GregorianCalendar c = new GregorianCalendar(); 
    c.setTime(yourDate); 
    XMLGregorianCalendar date2 = DatatypeFactory.newInstance().newXMLGregorianCalendar(c);
    
{% endhighlight java %}

# 如何检查一个字符串是否为数值型的字符串

被接受的回答是使用`Apache Commons Lang`包中的 `StringUtils.isNumeric`

{% highlight java %}

    StringUtils.isNumeric("23432")
    
{% endhighlight java %}
