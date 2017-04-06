---
layout:  post
title:  " 【Spring】基于IntelliJ IDEA搭建Maven "
date:    2016-11-02
excerpt: " 转载请注明出处：http://blog.csdn.net/qq_26525215本文源自【大学之旅_谙忆的博客】IntelliJIDEA下载地址:https://www.jetbrains.com/idea/download/IntelliJIDEA分为社区版和商业版，社区版免费，商业版功能强大很多。商业版只提供30天的试用。IDEA2016商业版的注册当然，在我中国，还有啥不免... "
categories: spring 
comments: true
---
转自 (csdn): http://blog.csdn.net/qq_26525215/article/details/53010442
<div class="markdown_views">
 <blockquote cite="陈浩翔"> 
  <p>转载请注明出处：<a href="http://blog.csdn.net/qq_26525215"><font color="green">http://blog.csdn.net/qq_26525215</font></a> 本文源自<strong>【<a href="http://blog.csdn.net/qq_26525215" target="_blank">大学之旅_谙忆的博客</a>】</strong></p> 
 </blockquote> 
 <p>IntelliJ IDEA下载地址:  <a href="https://www.jetbrains.com/idea/download/">https://www.jetbrains.com/idea/download/</a>  IntelliJ IDEA分为社区版和商业版，社区版免费，商业版功能强大很多。  商业版只提供30天的试用。  <img src="http://img.blog.csdn.net/20161102184055832" alt="" title=""></p> 
 <h2 id="idea2016商业版的注册">IDEA2016商业版的注册</h2> 
 <p>当然，在我中国，还有啥不免费的咯，商业版有破解的，你直接百度，  有很多破解方法，在这里，给一个IDEA2016商业版的注册码:</p> 
 <pre class="prettyprint"><code class=" hljs bash"><span class="hljs-number">43</span>B4A73YYJ-eyJsaWNlbnNlSWQiOiI0M0I0QTczWVlKIiwibGljZW5zZWVOYW1lIjoibGFuIHl1IiwiYXNzaWduZWVOYW1lIjoiIiwiYXNzaWduZWVFbWFpbCI6IiIsImxpY2Vuc2VSZXN0cmljdGlvbiI6IkZvciBlZHVjYXRpb25hbCB1c2Ugb25seSIsImNoZWNrQ29uY3VycmVudFVzZSI6ZmFsc2UsInByb2R1Y3RzIjpbeyJjb2RlIjoiSUkiLCJwYWlkVXBUbyI6IjIwMTctMDItMjU<span class="hljs-keyword">if</span>Sx7ImNvZGUiOiJBQyIsInBhaWRVcFRvIjoiMjAxNy0wMi0yNSJ9LHsiY29kZSI6IkRQTiIsInBhaWRVcFRvIjoiMjAxNy0wMi0yNSJ9LHsiY29kZSI6IlBTIiwicGFpZFVwVG8iOiIyMDE3LTAyLTI1In0seyJjb2RlIjoiRE0iLCJwYWlkVXBUbyI6IjIwMTctMDItMjU<span class="hljs-keyword">if</span>Sx7ImNvZGUiOiJDTCIsInBhaWRVcFRvIjoiMjAxNy0wMi0yNSJ9LHsiY29kZSI6IlJTMCIsInBhaWRVcFRvIjoiMjAxNy0wMi0yNSJ9LHsiY29kZSI6IlJDIiwicGFpZFVwVG8iOiIyMDE3LTAyLTI1In0seyJjb2RlIjoiUEMiLCJwYWlkVXBUbyI6IjIwMTctMDItMjU<span class="hljs-keyword">if</span>Sx7ImNvZGUiOiJSTSIsInBhaWRVcFRvIjoiMjAxNy0wMi0yNSJ9LHsiY29kZSI6IldTIiwicGFpZFVwVG8iOiIyMDE3LTAyLTI1In0seyJjb2RlIjoiREIiLCJwYWlkVXBUbyI6IjIwMTctMDItMjU<span class="hljs-keyword">if</span>Sx7ImNvZGUiOiJEQyIsInBhaWRVcFRvIjoiMjAxNy0wMi0yNSJ9XSwiaGFzaCI6IjMzOTgyOTkvMCIsImdyYWNlUGVyaW9kRGF5cyI6MCwiYXV0b1Byb2xvbmdhdGVkIjpmYWxzZSwiaXNBdXRvUHJvbG9uZ2F0ZWQiOmZhbHNlfQ==-keaxIkRgXPKE4BR/ZTs7s7UkP92LBxRe57HvWamu1EHVXTcV1B4f/KNQIrpOpN6dgpjig5eMVMPmo7yMPl+bmwQ8pTZaCGFuLqCHD1ngo6ywHKIQy0nR249sAUVaCl2wGJwaO4JeOh1opUx8chzSBVRZBMz0/MGyygi7duYAff9JQqfH3p/BhDTNM8eKl6z5tnneZ8ZG5bG1XvqFTqWk4FhGsEWdK7B+He44hPjBxKQl2gmZAodb6g9YxfTHhVRKQY5hQ7KPXNvh3ikerHkoaL5apgsVBZJOTDE2KdYTnGLmqxghFx6L0ofqKI6hMr48ergMyflDk6wLNGWJvYHLWw==-MIIEPjCCAiagAwIBAgIBBTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTE1MTEwMjA4MjE0OFoXDTE4MTEwMTA4MjE0OFowETEPMA0GA1UEAwwGcHJvZDN5MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxcQkq+zdxlR2mmRYBPzGbUNdMN6OaXiXzxIWtMEkrJMO/<span class="hljs-number">5</span>oUfQJbLLuMSMK0QHFmaI37WShyxZcfRCidwXjot4zmNBKnlyHodDij/<span class="hljs-number">78</span>TmVqFl8nOeD5+<span class="hljs-number">07</span>B8VEaIu7c3E1N+e1<span class="hljs-keyword">do</span>C6wht4I4+IEmtsPAdoaj5WCQVQbrI8KeT8M9VcBIWX7fD0fhexfg3ZRt0xqwMcXGNp3DdJHiO0rCdU+Itv7EmtnSVq9jBG1usMSFvMowR25mju2JcPFp1+I4ZI+FqgR8gyG8oiNDyNEoAbsR3lOpI7grUYSvkB/xVy/VoklPCK2h0f0GJxFjnye8NT1PAywoyl7RmiAVRE/EKwIDAQABo4GZMIGWMAkGA1UdEwQCMAAwHQYDVR0OBBYEFGEpG9oZGcfLMGNBkY7SgHiMGgTcMEgGA1UdIwRBMD+AFKOetkhnQhI2Qb1t4Lm0oFKLl/GzoRykGjAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBggkA0myxg7KDeeEwEwYDVR0lBAwwCgYIKwYBBQUHAwEwCwYDVR0PBAQDAgWgMA0GCSqGSIb3DQEBCwUAA4ICAQC9WZuYgQedSuOc5TOUSrRigMw4/+wuC5EtZBfvdl4HT/<span class="hljs-number">8</span>vzMW/oUlIP4YCvA0XKyBaCJ2iX+ZCDKoP<span class="hljs-keyword">fi</span>YXiaSiH+HxAPV6J79vvouxKrWg2XV6ShFtPLP+<span class="hljs-number">0</span>gPdGq3x9R3+kJbmAm8w+FOdlWqAfJrLvpzMGNeDU14YGXiZ9bVzmIQbwrBA+c/F4tlK/DV07dsNExihqFoibnqDiVNTGombaU2dDup2gwKdL81ua8EIcGNExHe82kjF4zwfadHk3bQVvbfdAwxcDy4xBjs3L4raPLU3yenSzr/OEur1+jfOxnQSmEcMXKXgrAQ9U55gwjcOFKrgOxEdek/Sk1VfOjvS+nuM4eyEruFMfaZHzoQiuw4IqgGc45ohFH0UUyjYcuFxxDSU9lMCv8qdHKm+wnPRb0l9l5vXsCBDuhAGYD6ss+Ga+aDY6f/qXZuUCEUOH3QUNbbCUlviSz6+GiRnt1kA9N2Qachl+<span class="hljs-number">2</span>yBfaqUqr8h7Z2gsx5LcIf5kYNsqJ0GavXTVyWh7PYiKX4bs354ZQLUwwa/cG++<span class="hljs-number">2</span>+wNWP+HtBhVxMRNTdVhSm38AknZlD+PTAsWGu9GyLmhti2EnVwGybSD2Dxmhxk3IPCkhKAK+pl0eWYGZWG3tJ9mZ7SowcXLWDFAk0lRJnKGFMTggrWjV8GYpw5bq23VmIqqDLgkNzuoog==</code></pre> 
 <p>原注册码分享的链接:<a href="http://aiyougege.com/articles/022711.html">http://aiyougege.com/articles/022711.html</a>  感谢。</p> 
 <p>下面来说说IDEA怎么搭建Maven吧。</p> 
 <h2 id="搭建maven">搭建Maven</h2> 
 <p>1、新建Maven项目。  选择File-&gt;New-&gt;Project-&gt;Maven.  如下图所示:  <img src="http://img.blog.csdn.net/20161102184938445" alt="" title=""></p> 
 <p><img src="http://img.blog.csdn.net/20161102184946476" alt="" title="">  点击next、</p> 
 <p>2、输入Maven项目坐标值。  com.wisely  highlight_spring4  1.0-SNAPSHOT  你可以自己修改哦  如图:  <img src="http://img.blog.csdn.net/20161102185154853" alt="" title=""></p> 
 <p>点击next、</p> 
 <p>3、选择存储路径  <img src="http://img.blog.csdn.net/20161102185312916" alt="" title="">  填写项目名和路径、  点击finish。</p> 
 <p>4、修改pom.xml文件、  原pom.xml文件:  <img src="http://img.blog.csdn.net/20161102185609793" alt="" title=""></p> 
 <p>修改为:</p> 
 <pre class="prettyprint"><code class=" hljs xml"><span class="hljs-pi">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-title">project</span> <span class="hljs-attribute">xmlns</span>=<span class="hljs-value">"http://maven.apache.org/POM/4.0.0"</span> <span class="hljs-attribute">xmlns:xsi</span>=<span class="hljs-value">"http://www.w3.org/2001/XMLSchema-instance"</span> <span class="hljs-attribute">xsi:schemaLocation</span>=<span class="hljs-value">"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">modelVersion</span>&gt;</span>4.0.0<span class="hljs-tag">&lt;/<span class="hljs-title">modelVersion</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-title">groupId</span>&gt;</span>com.wisely<span class="hljs-tag">&lt;/<span class="hljs-title">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">artifactId</span>&gt;</span>highlight_spring4<span class="hljs-tag">&lt;/<span class="hljs-title">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">version</span>&gt;</span>1.0-SNAPSHOT<span class="hljs-tag">&lt;/<span class="hljs-title">version</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">properties</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-title">java.version</span>&gt;</span>1.7<span class="hljs-tag">&lt;/<span class="hljs-title">java.version</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-title">properties</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">dependencies</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-title">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-title">groupId</span>&gt;</span>org.springframework<span class="hljs-tag">&lt;/<span class="hljs-title">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-title">artifactId</span>&gt;</span>spring-context<span class="hljs-tag">&lt;/<span class="hljs-title">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-title">version</span>&gt;</span>4.2.3.RELEASE<span class="hljs-tag">&lt;/<span class="hljs-title">version</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-title">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-title">dependencies</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">build</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-title">plugins</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-title">plugin</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-title">groupId</span>&gt;</span>org.apache.maven.plugins<span class="hljs-tag">&lt;/<span class="hljs-title">groupId</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-title">artifactId</span>&gt;</span>maven-compiler-plugin<span class="hljs-tag">&lt;/<span class="hljs-title">artifactId</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-title">version</span>&gt;</span>2.3.2<span class="hljs-tag">&lt;/<span class="hljs-title">version</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-title">configuration</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-title">source</span>&gt;</span>${java.version}<span class="hljs-tag">&lt;/<span class="hljs-title">source</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-title">target</span>&gt;</span>${java.version}<span class="hljs-tag">&lt;/<span class="hljs-title">target</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-title">configuration</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-title">plugin</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-title">plugins</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-title">build</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">project</span>&gt;</span></code></pre> 
 <p>修改完保存后，IDEA，会开启自动导入Maven依赖包功能。  如图:  <img src="http://img.blog.csdn.net/20161102193933014" alt="" title=""></p> 
 <p>这样就成功搭建好Maven了、</p> 
 <p>本文章由<a href="https://chenhaoxiang.github.io/">[谙忆]</a>编写， 所有权利保留。 </p> 
 <blockquote cite="陈浩翔"> 
  <p>转载请注明出处：<a href="http://blog.csdn.net/qq_26525215"><font color="green">http://blog.csdn.net/qq_26525215</font></a> 本文源自<strong>【<a href="http://blog.csdn.net/qq_26525215" target="_blank">大学之旅_谙忆的博客</a>】</strong></p> 
 </blockquote>
</div>