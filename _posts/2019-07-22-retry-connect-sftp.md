---
layout:  post
title:  "连接SFTP失败重试机制"
date:    2019-07-22
excerpt: "连接SFTP失败重试机制"
categories:  Java
comments: true
---

# 连接SFTP失败重试机制 #
{% highlight java %}

	//retry connect logic start
			try {
				sftp = new SftpClient(host, port, username, password);
			} catch (Throwable t) {
				String retryNumStr = ApplicationConfig.getApplicationConfig().getAppConfigParameter("SFTP_FAILED_RETRY_NUM");
				int retryNum = 3;
				try {
					retryNum = Integer.valueOf(retryNumStr);
				} catch (Exception e2) {
				}
				logger.error("Process SFTP backup ducument happen error and will retry:" , t);
				boolean hasErrorFlag = true;
				for(int i = 0 ; i < retryNum ; i ++){
					try {
						sftp = new SftpClient(host, port, username, password);
						hasErrorFlag = false;
						break;
					} catch (Throwable e) {
						logger.error("Process SFTP backup ducument happen SFTP error retry" +i+":" , e);
						hasErrorFlag = true;
					}
				}
				//retry is also fail
				if(hasErrorFlag) {
					cfg.setErrorMsg("backup file error: "+ getExceptionMessages(t));
					throw new DocCollectorException("Connect to SFTP error after retry " + retryNum + " times ", t.getMessage());
				}
			}
	//retry connect logic end
{% endhighlight java %}

