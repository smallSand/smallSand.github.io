---
layout:  post
title:  "通过java读取excel内容"
date:    2016-08-16
excerpt: "最近在写一个一个通过java 读取上传excel内容，并将数据存入数据库的方法，记录下自己的思路，与大家分享 "
categories:  笔记 Java excel
comments: false
---

大体讲讲思路，首先是文件上传，获取到文件在服务器的路径，通过路径获取到`File`对象，得到文件的输入流`instream`,然后通过文件流获得`Workbook`对象，这个对象里面包含了Excel表格的数据，调用`getSheet()`可以得到当前的页数，调用`getColumns()`和`getRows()`得到表格的行数和列数,通过两层`for`循环遍历行和列，可以定位每一个单元格的位置，读取单元格的内容。

# 引入jar包 #

我使用了第三方jxl.jar来处理Excel文档,所以首先需要将jxl.jar引入到项目中，[下载地址](http://sml9520.oschina.io/smallsand//file/jxl.jar)

# 上传待处理的Excel，得到文件路径 #

`EntityBean`可以看做是一个`HashMap`,其中有一个`uploadinfo`的键值，对应的是一个Json数组，数组中有一个`path`属性，对应的值为文件上传的路径`filepath`

`readEXCEL(String filepath)`是另外一个方法，通过传入的文件路径解析Excel文件

{% highlight java %}
 public EntityBean INSY_uploadProductData ( EntityBean bean )
    {
        String str = bean.getString("uploadinfo");
        JSONArray arr;
        EntityBean result=null;
        try
        {
            arr = new JSONArray(str);
            //文件路径
            String filepath=arr.getJSONObject(0).getString("path");
            result=this.readEXCEL(filepath);
        }
        catch (Exception e)
        {
            Global.getInstance().LogError(e);
        }
        return result;
    }
{% endhighlight java %}

# 解析Excel文件 #

在解析之前，你应该注意到了`checkExcel(Sheet readsheet,int rsColumns)`这个方法，是用来检验Excel的表头格式时候符合要求

{% highlight java %}
private EntityBean readEXCEL(String filepath) {
        //记录失败的行
        StringBuilder sb=new StringBuilder();
        DataSource ds = null;
        Transaction tx =null;
        Workbook  readwb=null;
        InputStream instream=null;
        //成功数
        int sucnum=0;
        EntityBean[] EntityBeans=null;
        EntityBean result=new EntityBean();
        try
        {
            ds = Global.getInstance().getDataSource();
            tx=ds.createTransaction();
            instream = new FileInputStream(filepath);
            readwb= Workbook.getWorkbook(instream); 
            Sheet readsheet = readwb.getSheet(0); 
            //获取Sheet表中所包含的总列数   
            int rsColumns = readsheet.getColumns();   
            //获取Sheet表中所包含的总行数   
            int rsRows = readsheet.getRows();   
            //总记录数
            result.set("count", rsRows-1);
            //检查第一行
            if(!checkExcel(readsheet,rsColumns)){
                result.set("result", false);
                return result;
            }
            //获取指定单元格的对象引用   
            EntityBeans=new EntityBean[rsRows];
            for (int i = 1; i < rsRows; i++)   
            { 
                //每行数据
                EntityBeans[i]=new EntityBean();
                for (int j = 0; j < rsColumns; j++)   
                {
                    String cotent=null;
                    SimpleDateFormat DateFormat =new SimpleDateFormat("yyyy-MM-dd");
                    Cell cell = readsheet.getCell(j, i);
                    //如果单元格为日期类型
                    if(cell.getType() == CellType.DATE){
                        DateCell dc = (DateCell)cell;
                       Date date = dc.getDate();   //获取单元格的date类型
                       cotent=DateFormat.format(date);
                   }else{
                       cotent=cell.getContents().trim();  
                   }
                    if(j==1){  //A
                        if(StringUtils.isEmpty(cotent)){ 
                            break;
                        }
                        EntityBeans[i].set("productname", cotent);
                    }else if(j==2){//B
                        if(StringUtils.isEmpty(cotent)){ 
                            break;
                    }
                        EntityBeans[i].set("company", cotent);
                    }else if(j==3){//C
                        EntityBeans[i].set("companyno", cotent);
                    }else if(j==4){//D
                        EntityBeans[i].set("recordtime", cotent);
                    }else if(j==5){//E
                        EntityBeans[i].set("inssort", cotent);
                    }else if(j==6){//F
                        EntityBeans[i].set("prodtype", cotent);
                    }else if(j==7){//G
                        EntityBeans[i].set("issale", cotent);
                    }else if(j==8){//H
                        EntityBeans[i].set("designtype", cotent);
                    }else if(j==9){//I
                        EntityBeans[i].set("approveway", cotent);
                    }else if(j==10){//J
                        EntityBeans[i].set("payway", cotent);
                    }else if(j==11){//K
                        EntityBeans[i].set("specialattr", cotent);
                    }else if(j==12){//L
                        EntityBeans[i].set("protectetime", cotent);
                    }else if(j==13){//M
                        EntityBeans[i].set("itemcode", cotent);
                    }else if(j==14){//N
                        EntityBeans[i].set("outsaletime", cotent);
                    }else if(j==15){//O
                        EntityBeans[i].set("producturl", cotent);
                    }else if(j==16){//P
                        EntityBeans[i].set("producturl", cotent);
                    }
                }
                if(StringUtils.isNotEmpty(EntityBeans[i].getString("productname"),EntityBeans[i].getString("company"))){
                    EntityBeans[i].setbeanname("product");
                    EntityBeans[i].set("id",java.util.UUID.randomUUID().toString().replace("-", ""));
                    EntityBeans[i].set("isclassifi","2");
                    EntityBeans[i].insert(tx);
                    sucnum++; 
                }else{
                    if(StringUtils.isEmpty(readsheet.getCell(0, i).getContents().trim())){
                        sb.append(i-1+",");
                    }else{
                        sb.append(readsheet.getCell(0, i).getContents().trim()+",");
                    }
                }
            }
            //处理成功记录数
            result.set("num", sucnum);
            if(StringUtils.isNotEmpty(sb.toString())){
                result.set("emptyrows", sb.substring(0,sb.length()-1));
                result.set("failnum", sb.substring(0,sb.length()-1).split(",").length);
            }else{
                result.set("emptyrows","");
                result.set("failnum",0);
            }
            if(tx.commit()){
                result.set("result", true);
            }
            
            if(instream!=null){
                instream.close();
            }
        }
        catch (Exception e)
        {
            if(tx!=null){
                tx.rollback();
            }
            e.printStackTrace();
        }finally{
            if(tx!=null){
                tx.close();
            }if(readwb!=null){
                readwb.close();
            }
        }   
        return result;
  }
{% endhighlight java %}

# 检验格式的方法 #

检验Excel文档的第一行即可

{% highlight java %}
 private  static boolean checkExcel(Sheet readsheet,int rsColumns){
        //检查第一行
        boolean flag=true;
        for(int a=0;a<rsColumns;a++){
            String cotent = readsheet.getCell(a, 0).getContents().trim();
            if(a==0){  //A
                if(!cotent.equals("序号*")){
                    flag=false;
                    break;
                }
            }
            if(a==1){  //A
                if(!cotent.equals("产品名称*")){
                    flag=false;
                    break;
                }
            }else if(a==2){//B
                if(!cotent.equals("公司名称*")){
                    flag=false;
                    break;
                }
            }else if(a==3){//C
                if(!cotent.equals("备案编号")){
                    flag=false;
                    break;
                }
            }else if(a==4){//D
                if(!cotent.equals("备案时间")){
                    flag=false;
                    break;
                }
            }else if(a==5){//E
                if(!cotent.equals("险种")){
                    flag=false;
                    break;
                }
            }else if(a==6){//F
                if(!cotent.equals("产品类型")){
                    flag=false;
                    break;
                }
            }else if(a==7){//G
                if(!cotent.equals("是否在售")){
                    flag=false;
                    break;
                }
            }else if(a==8){//H
                if(!cotent.equals("设计类型")){
                    flag=false;
                    break;
                }
            }else if(a==9){//I
                if(!cotent.equals("承保方式")){
                    flag=false;
                    break;
                }
            }else if(a==10){//a
                if(!cotent.equals("缴款方式")){
                    flag=false;
                    break;
                }
            }else if(a==11){//K
                if(!cotent.equals("特殊属性")){
                    flag=false;
                    break;
                }
            }else if(a==12){//L
                if(!cotent.equals("保险期间")){
                    flag=false;
                    break;
                }
            }else if(a==13){//M
                if(!cotent.equals("条款编码")){
                    flag=false;
                    break;
                }
            }else if(a==14){//N
                if(!cotent.equals("停售时间")){
                    flag=false;
                    break;
                }
            }else if(a==15){//O
                if(!cotent.equals("条款URL")){
                    flag=false;
                    break;
                }
            }
        }
        return flag;
    }
{% endhighlight java %}

# 附录 #
[模板Excel](http://sml9520.oschina.io/smallsand/file/cpmb.xls)