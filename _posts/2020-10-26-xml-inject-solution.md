---
layout:  post
title:  "记一次生产环境XML注入问题发现与解决"
date:    2020-10-26
excerpt: "2020年10月22号客户想去更新loader name为 EPP-INV-SCAN 的Data Loader数据，发现open就报错了 'javaType cannot be null or empty'..."
categories:  Java
comments: true
---

# Data Loader介绍
当需要从其他系统读取文件数据到SCF系统的时候，一般是从远程SFTP系统读取，需要用到data loader,页面有一个字段叫Loader Parameter,在postgresql数据对应一个
text类型存储，在页面是一个look up的按钮操作，点击打开时候，弹出来一个PopUp页面，展示连接远程SFTP的host，端口号，用户名，密码，读取文件的目录等信息，当页面输入这些信息的时候，点击OK 按钮，会把这些信息组装成一个XML格式的数据，然后存到数据库

![](https://smallsand.github.io/image/20201026133548.png)

# 使用CDATA去处理用户输入数据
因为用户数据的数据用可能存在XML中的预定义字符，所以在生成XML的时候可能导致XML格式报错，所以用<![CDATA[]]>去包裹住用户输入的内容，XML解析器解析<![CDATA[]]>中的数据时候会把里面的内容当成普通文本处理

在 XML 中有 5 个预定义字符 ：

| &lt; | < | 小于 |
| &gt; | > | 大于 |
| &amp; | & | 并且 |
| &apos; | ' | 单引号 |
| &quot; | " | 双引号 |

所以最终存在数据库的XML内容可能是这样的

{% highlight XML %}
	
		<params>
		    <param paramName="HostName" paramDesc="Host Name" paramDataType="String" isRequired="Y" isPassword="false">
		        <![CDATA[xxxxxxx]]>
		    </param>
		    <param paramName="HostPort" paramDesc="Host Port" paramDataType="Integer" isRequired="Y" isPassword="false">
		        <![CDATA[22]]>
		    </param>
		    <param paramName="UserName" paramDesc="User Name" paramDataType="String" isPassword="false">
		        <![CDATA[xxxxx]]>
		    </param>
		    <param paramName="Password" paramDesc="Password" paramDataType="String" isPassword="true">
		        <![CDATA[{xor}IInBVLlSfl6gphG7HdYGxw==]]>
		    </param>
		    <param paramName="DefaultRemoteDir" paramDesc="Default Remote Directory" paramDataType="String" isRequired="Y" isPassword="false">
		        <![CDATA[xxxxx]]>
		    </param>
		    <param paramName="backupProcessedFile" paramDesc="Backup Processed File" paramDataType="Boolean" isRequired="Y" possiableValues="{''Y, YES'',''N, NO''}" isPassword="false">
		        <![CDATA[Y]]>
		    </param>
		    <param paramName="backupDirectory" paramDesc="Backup Directory" paramDataType="String" isRequired="N" isPassword="false">
		        <![CDATA[xxxxx]]>
		    </param>
		    <param paramName="localDirectory" paramDesc="Local Directory" paramDataType="String" isRequired="Y" isPassword="false">
		        <![CDATA[xxxxxx]]>
		    </param>
		    <param paramName="JNDIName" paramDesc="JNDI Name" paramDataType="String" isRequired="Y" isPassword="false">
		        <![CDATA[xxx]]>
		    </param>
		    <param paramName="QueueName" paramDesc="Queue Name" paramDataType="String" isRequired="Y" isPassword="false">
		        <![CDATA[xxxx]]>
		    </param>
		    <param paramName="siteCode" paramDesc="Site Code" paramDataType="String" isRequired="Y" isPassword="false">
		        <![CDATA[SCBTHL]]>
		    </param>
		    <param paramName="messageType" paramDesc="Message Type" paramDataType="String" isRequired="Y" isPassword="false">
		        <![CDATA[xxx]]>
		    </param>
		    <param paramName="messageFormatType" paramDesc="File Extension" paramDataType="String" isRequired="Y" possiableValues="{''DONE, OK''}" comments="This parameter define incoming message format type, Such as DONE etc., it is required. Message Format Type is multi-type, user '','' compart" isPassword="false">
		        <![CDATA[.TXT]]>
		    </param>
		    <param paramName="Is File Encrypted" paramDesc="Is File Encrypted" paramDataType="Boolean" isRequired="Y" isPassword="false">
		        <![CDATA[N]]>
		    </param>
		    <param paramName="Decryption Key" paramDesc="Decryption Key" paramDataType="DYNADROPDOWN:DECRYPTION-KEY" isRequired="N" isPassword="false">
		        <![CDATA[scf]]>
		    </param>
		    <param paramName="File Encoding" paramDesc="File Encoding" paramDataType="DYNADROPDOWN:FILE-ENCODING" isRequired="N" isPassword="false">
		        <![CDATA[]]>
		    </param>
		</params>
	

{% endhighlight XML %}

# 问题发现
2020年10月22号客户想去更新loader name为 EPP-INV-SCAN 的Data Loader数据，发现open就报错了 'javaType cannot be null or empty'。
通过分析日志发现原因是如果解析XML节点中的一个attribute为paramDataType的属性时候报错，如果发现这个节点不存在就抛异常，正常情况下初始化的数据应该都是包含这个属性的。通过查询生产环境数据库，我们拿到了Loader Parameter的XML数据，隐藏了部分数据，如下：

{% highlight XML %}

	<params>
	    <param paramName="HostName" paramDesc="Host Name" paramDataType="String" isRequired="Y" isPassword="false">
	        <![CDATA[xxxxx]]>
	    </param>
	    <param paramName="HostPort" paramDesc="Host Port" paramDataType="Integer" isRequired="Y" isPassword="false">
	        <![CDATA[22]]>
	    </param>
	    <param paramName="UserName" paramDesc="User Name" paramDataType="String" isPassword="false">
	        <![CDATA[xxxx]]>
	    </param>
	    <param paramName="Password" paramDesc="Password" paramDataType="String" isPassword="true">
	        <![CDATA[<params><param name='IP'  multiple='false'  isPassword='false' dataType='String'>
	        <![CDATA[xxxxx]]>
	    </param>
	    <param name='PORT'  multiple='false'  isPassword='false' dataType='String'>
	        <![CDATA[22]]>
	    </param>
	    <param name='USERNAME'  multiple='false'  isPassword='false' dataType='String'>
	        <![CDATA[xxxxx]]>
	    </param>
	    <param name='PASSWORD'  multiple='false'  isPassword='true' dataType='String'>
	        <![CDATA[{xor}ens1USvf07Dmlia3Uwrelw==]]>
	    </param>
	    <param name='PATH'  multiple='false'  isPassword='false' dataType='String'>
	        <![CDATA[xxxx]]>
	    </param>
	    <param name='IsAddSuffix'  multiple='false'  isPassword='false' dataType='String'>
	        <![CDATA[N]]>
	    </param>
	    <param name='Suffix'  multiple='false'  isPassword='false' dataType='String'>
	        <![CDATA[]]>
	    </param>
	    <param name='Is Encryption Required'  multiple='false'  isPassword='false' dataType='Boolean'>
	        <![CDATA[Y]]>
	    </param>
	    <param name='Encryption Key'  multiple='false'  isPassword='false' dataType='DYNADROPDOWN:ENCRYPTION-KEY'>
	        <![CDATA[xxxx]]>
	    </param>
	    <param paramName="DefaultRemoteDir" paramDesc="Default Remote Directory" paramDataType="String" isRequired="Y" isPassword="false">
	        <![CDATA[xxxx]]>
	    </param>
	    <param paramName="backupProcessedFile" paramDesc="Backup Processed File" paramDataType="Boolean" isRequired="Y" possiableValues="{'Y, YES','N, NO'}" isPassword="false">
	        <![CDATA[Y]]>
	    </param>
	    <param paramName="backupDirectory" paramDesc="Backup Directory" paramDataType="String" isRequired="N" isPassword="false">
	        <![CDATA[xxxx]]>
	    </param>
	    <param paramName="localDirectory" paramDesc="Local Directory" paramDataType="String" isRequired="Y" isPassword="false">
	        <![CDATA[xxx]]>
	    </param>
	    <param paramName="JNDIName" paramDesc="JNDI Name" paramDataType="String" isRequired="Y" isPassword="false">
	        <![CDATA[xxx]]>
	    </param>
	    <param paramName="QueueName" paramDesc="Queue Name" paramDataType="String" isRequired="Y" isPassword="false">
	        <![CDATA[xxxx]]>
	    </param>
	    <param paramName="siteCode" paramDesc="Site Code" paramDataType="String" isRequired="Y" isPassword="false">
	        <![CDATA[xxx]]>
	    </param>
	    <param paramName="messageType" paramDesc="Message Type" paramDataType="String" isRequired="Y" isPassword="false">
	        <![CDATA[xxx]]>
	    </param>
	    <param paramName="messageFormatType" paramDesc="File Extension" paramDataType="String" isRequired="Y" possiableValues="{'DONE, OK'}" comments="This parameter define incoming message format type, Such as DONE etc., it is required. Message Format Type is multi-type, user ',' compart" isPassword="false">
	        <![CDATA[.TXT]]>
	    </param>
	    <param paramName="Is File Encrypted" paramDesc="Is File Encrypted" paramDataType="Boolean" isRequired="Y" isPassword="false">
	        <![CDATA[N]]>
	    </param>
	    <param paramName="Decryption Key" paramDesc="Decryption Key" paramDataType="DYNADROPDOWN:DECRYPTION-KEY" isRequired="N" isPassword="false">
	        <![CDATA[scf]]>
	    </param>
	    <param paramName="File Encoding" paramDesc="File Encoding" paramDataType="DYNADROPDOWN:FILE-ENCODING" isRequired="N" isPassword="false">
	        <![CDATA[]]>
	    </param>
	</params>

{% endhighlight XML %}

报错的地方就是出在PORT，USERNAME，PASSWORD，PATH，IsAddSuffix 等 这几个没有paramDataType的参数上，如果解析XML的时候 如果没有读到这个属性，就会抛异常，这就是页面打开会报错的原因。很奇怪的是这几个参数从哪里来的？我们初始化的脚本里面不会有这几个参数，通过页面生成的XML用也不会有这些参数。仔细观察后，还发现一个很奇怪的现象，就是Password这个节点下面，居然存在一个参数节点！！

{% highlight XML %}

	<params><param name='IP'  multiple='false'  isPassword='false' dataType='String'>

{% endhighlight XML %}


这个参数节点是怎么产生的？在细想，这是是用户输入进去的，如果用户输入,就会产生XML注入

{% highlight XML %}

	<params><param name='IP'  multiple='false'  isPassword='false' dataType='String'>
	        <![CDATA[xxxxx]]>
	    </param>
	    <param name='PORT'  multiple='false'  isPassword='false' dataType='String'>
	        <![CDATA[22]]>
	    </param>
	    <param name='USERNAME'  multiple='false'  isPassword='false' dataType='String'>
	        <![CDATA[xxxxx]]>
	    </param>
	    <param name='PASSWORD'  multiple='false'  isPassword='true' dataType='String'>
	        <![CDATA[{xor}ens1USvf07Dmlia3Uwrelw==]]>
	    </param>
	    <param name='PATH'  multiple='false'  isPassword='false' dataType='String'>
	        <![CDATA[xxxx]]>
	    </param>
	    <param name='IsAddSuffix'  multiple='false'  isPassword='false' dataType='String'>
	        <![CDATA[N]]>
	    </param>
	    <param name='Suffix'  multiple='false'  isPassword='false' dataType='String'>
	        <![CDATA[]]>
	    </param>
	    <param name='Is Encryption Required'  multiple='false'  isPassword='false' dataType='Boolean'>
	        <![CDATA[Y
 

{% endhighlight XML %}

问题就出在用CDATA去处理用户输入数据的地方，在这里发生了XML注入

# 问题解决
对于用户输入的参数进行转义处理，不能存在任何XML的关键字符，转义以后再去组装XML存数据库
