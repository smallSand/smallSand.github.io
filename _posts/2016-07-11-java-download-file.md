---
layout: post
title:  "java 下载网络文件的例子"
date:   2016-07-09
excerpt: "最近在网上爬取保险产品的数据，获得到了大量条款的URL连接,编写以下方法将文件下载到本地"
categories:  Java I/O流  下载
comments: false
---

## 编写辅助方法

将输入流转换成字节数据

{% highlight Java %}
	
public static  byte[] readInputStream(InputStream inputStream) throws IOException {    
    byte[] buffer = new byte[1024];    
    int len = 0;    
	ByteArrayOutputStream bos = new ByteArrayOutputStream();    
	while((len = inputStream.read(buffer)) != -1) {    
	     bos.write(buffer, 0, len);    
	 }    
	bos.close();    
    return bos.toByteArray();    
}  
	  
{% endhighlight %}

## 通过URL打开一个连接

获取连接的输入流,并转换成字节数组，通过输出流将字节数组写入文件

{% highlight Java %}

public static void  downLoadFromUrl(String urlStr,String fileName,String savePath) throws Exception{  
        URL url = new URL(urlStr);    
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();    
        //防止屏蔽程序抓取而返回403错误  
        conn.setRequestProperty("Referer","http://www.iachina.cn/IC/tkk/03/pdf.worker.js");  
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36"); 
        //尝试连接30s
		conn.setConnectTimeout(1000*3*60);
		conn.setReadTimeout(1000*3*60);
        //得到输入流  
        InputStream inputStream = conn.getInputStream();    
        //获取自己数组  
        byte[] getData = readInputStream(inputStream);      
        //文件保存位置  
        File saveDir = new File(savePath);  
        if(!saveDir.exists()){
            saveDir.mkdir();  
        }  
        File file = new File(saveDir+File.separator+fileName+".pdf"); 
        if(file.exists()){
            fos = new FileOutputStream(file);       
            fos.write(getData);
        }
        if(fos!=null){  
            fos.close();    
        }  
        if(inputStream!=null){  
            inputStream.close();  
        }  
        System.out.println("info:"+url+" download success");   
    } 
    
{% endhighlight %}