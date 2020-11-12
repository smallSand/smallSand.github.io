---
layout: post
title:  "postgreSQL 笔记"
date:   2016-07-09
excerpt: "最近一直在使用postgreSQL处理数据,记录下常用的操作,方便以后查询"
categories:  postgreSQL 笔记  SQL
comments: false
---

# 字符串处理函数 #

 函数 ：`character_length()`

说明 ：返回字符串的长度

例子：  select character_length('中国人寿保险股份有限公司')  返回值为12
 
函数 ：substring(Arg[varchar] from begin[int] for end[int])

说明 ：截取字符串

例子： substring('中国人寿保险股份有限公司' from 0 for character_length('中国人寿保险股份有限公司')-1)   返回值为'中国人寿保险股份有限公' 去掉了最后一个字符串


----------

函数 ：`||`

例子：  
{% highlight SQL %}

'我'||'喜欢'||'你'='我喜欢你'

select 'Value: ' || 42; = Value: 42

{% endhighlight %}

函数：`bit_length(string)`

说明：Number of bits in string 计算字符串的位数

例子：select bit_length('pmars') = 40

 ----------

函数：`char_length(string) or character_length(string)`

说明：Number of characters in string 计算字符串中字符个数

例子：select char_length('pmars'); = 5

 ----------

函数：`lower(string)`

说明：Convert string to lower case 转换字符串为小写

例子：select lower('PmArS'); = "pmars"

 ----------

函数：`octet_length(string)`

说明：Number of bytes in string 计算字符串的字节数

例子：select octet_length('我是pmars'); = 11  select octet_length('我');  = 3

----------

函数：`overlay(string placing string from int [for int])`

说明：Replace substring 替换字符串中任意长度的子字串为新字符串

例子：select overlay('I am pmars' placing 'ming' from 6 for 5); = "I am ming"

----------

函数：`position(substring in string)`

说明：Location of specified substring 子串在一字符串中的位置

例子：select position('ma' in 'pmars'); = 2

----------

函数：`substring(string [from int] [for int])`

说明：Extract substring 截取任意长度的子字符串

例子：select substring('topmars' from 3 for 3); = "pma"

----------

函数：`substring(string from pattern)`

说明：Extract substring matching POSIX regular expression. See Section 9.7 for more information on pattern matching. 利用正则表达式对一字符串进行任意长度的字串的截取

例子：select substring('topmars' from 'p.*$'); = "pmars"

----------

函数：`substring(string from pattern for escape)`

说明：Extract substring matching SQL regular expression. See Section 9.7 for more information on pattern matching. 利于正则表达式对某类字符进行删除，以得到子字符串

例子：select substring('Thomas' from '%#"o_a#"_' for '#'); = "oma"

----------

函数：`trim([leading | trailing | both] [characters] from string)`

说明：Remove the longest string containing only the characters (a space by default) from the start/end/both ends of the string 去除尽可能长开始，结束或者两边的某类字符，默认为去除空白字符，当然可以自己指定，可同时指定多个要删除的字符串

例子：select trim(leading 'p' from 'pmars'); = "mars"

----------

函数：`upper(string)`

说明：Convert string to uppercase 将字符串转换为大写

例子：select upper('pmars'); = "PMARS"

----------

函数：`ascii(string)`

说明：ASCII code of the first character of the argument. For UTF8 returns the Unicode code point of the character. For other multibyte encodings. the argument must be a strictly ASCII character. 得到某一个字符的Assii值

例子：select ascii('pmars'); = select ascii('p'); = 112

----------

函数：`btrim(string text [, characters text])`

说明：Remove the longest string consisting only of characters in characters (a space by default) from the start and end of string 去除字符串两边的所有指定的字符，可同时指定多个字符

例子：select btrim('pmars','prs'); = "ma"

----------

函数：`chr(int)`

说明：Character with the given code. For UTF8 the argument is treated as a Unicode code point. For other multibyte encodings the argument must designate a strictly ASCII character. The NULL (0) character is not allowed because text data types cannot store such bytes. 得到某ACSII值对应的字符

例子：select chr(65); = A

----------

函数：`convert(string bytea, src_encoding name, dest_encoding name) `

说明：Convert string to dest_encoding. The original encoding is specified by src_encoding. The string must be valid in this encoding. Conversions can be defined by CREATE CONVERSION. Also there are some predefined conversions. See Table 9-7 for available conversions. 转换字符串编码，指定源编码与目标编码

例子：select convert('我是pmars_in_utf8', 'UTF8', 'GBK'); = "\316\322\312\307pmars_in_utf8"

----------

函数：`convert_from(string bytea, src_encoding name)` 

说明：Convert string to the database encoding. The original encoding is specified by src_encoding. The string must be valid in this encoding. 转换字符串编码，自己要指定源编码,目标编码默认为数据库指定编码，

例子：select convert_from('\316\322\312\307pmars','GBK'); = "我是pmars"

----------

函数：`convert_to(string text, dest_encoding name) `

说明：Convert string to dest_encoding.转换字符串编码，源编码默认为数据库指定编码，自己要指定目标编码,

例子：select convert_to('我是pmars_in_utf8','GBK'); = "\316\322\312\307pmars_in_utf8"

----------

函数：`decode(string text, type text) `   

说明：Decode binary data from string previously encoded with encode. Parameter type is same as in encode. 对字符串按指定的类型进行解码

例子：select decode('MTIzAAE=', 'base64'); = "123\000\001"

----------

函数：`encode(data bytea, type text) `

说明：Encode binary data to different representation. Supported types are: base64, hex, escape. Escape merely outputs null bytes as \000 and doubles backslashes. 与decode相反，对字符串按指定类型进行编码

例子：select encode('123\000\001','base64'); = "MTIzAAE="

----------

函数：`initcap(string)`

说明：Convert the first letter of each word to uppercase and the rest to lowercase. Words are sequences of alphanumeric characters separated by non-alphanumeric characters. 将字符串所有的单词进行格式化，首字母大写，其它为小写

例子：select initcap('I AM PMARs'); = "I Am Pmars"

----------

函数：`length(string)`

说明：Number of characters in string 讲算字符串长度

例子：select length('我是pmars'); = 7

----------

函数：`length(stringbytea, encoding name )`

说明：Number of characters in string in the given encoding. The string must be valid in this encoding. 计算字符串长度，指定字符串使用的编码

例子：select length('我是pmars','GBK'); = 8

----------

函数：`lpad(string text, length int [, fill text]) `

说明：Fill up the string to length length by prepending the characters fill (a space by default). If the string is already longer than length then it is truncated (on the right). 对字符串左边进行某类字符自动填充，即不足某一长度，则在左边自动补上指定的字符串，直至达到指定长度，可同时指定多个自动填充的字符

例子：select lpad('pmars', 10, 'to'); = "tototpmars"

----------

函数：`ltrim(string text [, characters text]) `

说明：Remove the longest string containing only characters from characters (a space by default) from the start of string 删除字符串左边某一些的字符，可以时指定多个要删除的字符

例子：select ltrim('pmars','amp'); = "rs"

----------

函数：`md5(string)`

说明：Calculates the MD5 hash of string, returning the result in hexadecimal 将字符串进行md5编码

例子：select md5('pmars'); = "1018ceb949f1472f7252f7da1f5eff42"

----------

函数：`pg_client_encoding()`

说明：Current client encoding name 得到pg客户端编码

例子：select pg_client_encoding(); = "UTF8"

----------

函数：`quote_ident(string text)`

说明：Return the given string suitably quoted to be used as an identifier in an SQL statement string. Quotes are added only if necessary (i.e., if the string contains non-identifier characters or would be case-folded). Embedded quotes are properly doubled. 对某一字符串加上两引号

例子：quote_ident('Foo bar') = "Foo bar"

----------


函数：`quote_literal(string text)`

说明：Return the given string suitably quoted to be used as a string literal in an SQL statement string. Embedded single-quotes and backslashes are properly doubled. 对字符串里两边加上单引号，如果字符串里面出现sql编码的单个单引号，则会被表达成两个单引号

例子：quote_literal('O\'Reilly') = 'O''Reilly'

----------

函数：`quote_literal(value anyelement)`

说明：Coerce the given value to text and then quote it as a literal. Embedded single-quotes and backslashes are properly doubled. 将一数值转换为字符串，并为其两边加上单引号，如果数值中间出现了单引号，也会被表示成两个单引号

例子：quote_literal(42.5) = '42.5'

----------

函数：`regexp_matches(string text, pattern text [, flags text])`

说明：Return all captured substrings resulting from matching a POSIX regular expression against the string. See Section 9.7.3 for more information. 对字符串按正则表达式进行匹配，如果存在则会在结果数组中表示出来

例子：regexp_matches('foobarbequebaz', '(bar)(beque)') = {bar,beque}

----------

函数：`regexp_replace(string text, pattern text, replacement text [, flags text])`

说明：Replace substring(s) matching a POSIX regular expression. See Section 9.7.3 for more information. 利用正则表达式对字符串进行替换

例子：regexp_replace('Thomas', '.[mN]a.', 'M') = ThM

----------

函数：`regexp_split_to_array(string text, pattern text [, flags text ])`

说明：Split string using a POSIX regular expression as the delimiter. See Section 9.7.3 for more information. 利用正则表达式将字符串分割成数组

例子：regexp_split_to_array('hello world', E'\\s+') = {hello,world}

----------

函数：`regexp_split_to_table(string text, pattern text [, flags text])`

说明：Split string using a POSIX regular expression as the delimiter. See Section 9.7.3 for more information. 利用正则表达式将字符串分割成表格

例子：regexp_split_to_table('hello world', E'\\s+') = 
hello
world
(2 rows)

----------

函数：`repeat(string text, number int)`

说明：Repeat string the specified number of times 重复字符串一指定次数

例子：repeat('Pg', 4) = PgPgPgPg

----------

函数：`replace(string text, from text, to text)`

说明：Replace all occurrences in string of substring from with substring to 将字符的某一子串替换成另一子串

例子：('abcdefabcdef', 'cd', 'XX') = abXXefabXXef

----------

函数：`rpad(string text, length int [, fill text]) `

说明：Fill up the string to length length by appending the characters fill (a space by default). If the string is already longer than length then it is truncated. 对字符串进行填充，填充内容为指定的字符串

例子：rpad('hi', 5, 'xy') = hixyx

----------

函数：`rtrim(string text [, characters text])`

说明：Remove the longest string containing only characters from characters (a space by default) from the end of string 
去除字符串右边指定的字符

例子：rtrim('trimxxxx', 'x') = trim

----------

函数：`split_part(string text, delimiter text, field int)`

说明：Split string on delimiter and return the given field (counting from one)  对字符串按指定子串进行分割，并返回指定的数值位置的值

例子：split_part('abc~@~def~@~ghi', '~@~', 2) = def

----------

函数：`strpos(string, substring)`

说明：Location of specified substring (same as position(substring in string), but note the reversed argument order) 指定字符串在目标字符串的位置

例子：strpos('high', 'ig') = 2

----------

函数：`substr(string, from [, count])`

说明：Extract substring (same as substring(string from from for count)) 截取子串

例子：substr('alphabet', 3, 2) = ph

----------

函数：`to_ascii(string text [, encoding text])`

说明：Convert string to ASCII from another encoding (only supports conversion from LATIN1, LATIN2, LATIN9, and WIN1250 encodings) 将字符串转换成ascii编码字符串

例子：to_ascii('Karel') = Karel

----------

函数：`to_hex(number int or bigint)`

说明：Convert number to its equivalent hexadecimal representation 　对数值进行十六进制编码

例子：to_hex(2147483647) = 7fffffff

----------

函数：`translate(string text, from text, to text) `

说明：Any character in string that matches a character in the from set is replaced by the corresponding character in the to set 将字符串中某些匹配的字符替换成指定字符串，目标字符与源字符都可以同时指定多个

例子：translate('12345', '14', 'ax') = a23x5

# 序列的基本使用 #

创建序列 ：

{% highlight SQL %}
create sequence seq_tb_prod_id increment by 1 minvalue 1 no maxvalue start with 1; 
{% endhighlight %}

还可以可以简单点

{% highlight SQL %}
create sequence seq_tb_prod_id;
{% endhighlight %}

建议序列使用seq开头,后边通过下划线分割，连接表名和需要绑定的字段（一般设置为字段的默认值为序列的下一个值）

在创建表的时候为某个字段绑定序列值
{% highlight SQL %}
CREATE TABLE tb_prod
(
  id integer DEFAULT nextval('seq_tb_prod_id'::regclass),
  company character varying(100),
  prodname character varying(100),
  recordtime character varying(100),
  issale character varying(100),
  designtype character varying(100),
  approveway character varying(100),
  payway character varying(100),
  specialattr character varying(100),
  protectetime character varying(100),
  itemcode character varying(100),
  outsaletime character varying(100),
  produrl character varying(2000),
  prodtype character varying(100)
)
{% endhighlight %}

# 存储过程以及使用游标的例子 #

{% highlight SQL %}
CREATE or replace FUNCTION pro_n_product() RETURNS text  AS 
$$
DECLARE
  p record;
  result varchar;
  sum int;
  prod int;
  _recorddate varchar;

BEGIN
   for p in (select * from tb_prod where issale='在售') loop
  
	select  into _recorddate (select recorddate from (select t.companyname,b.name,b.recorddate from insyproduct b left join compay t on (b.companyno=t.companyno)where companyname=p.company and name=p.prodname) as c );
	
	update tb_prod set recordtime=_recorddate where issale='在售' and company=p.company and prodname=p.prodname;

   	end loop;

    result='OK';

    return result;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}

如何调用

{% highlight SQL %}
select pro_n_product()
{% endhighlight %}

执行成功，会返回OK

删除存储过程

{% highlight SQL %}
DROP FUNCTION pro_n_product();
{% endhighlight %}


另外一个例子
`RAISE NOTICE` 可用于打印控制台消息
{% highlight SQL %}
CREATE FUNCTION somefunc() RETURNS integer AS $$
DECLARE
   quantity integer := 30;
BEGIN
   RAISE NOTICE 'Quantity here is %', quantity;  -- 在这里的数量是 30
   quantity := 50;
   --
   -- 创建一个子块
   --
   DECLARE
      quantity integer := 80;
   BEGIN
      RAISE NOTICE 'Quantity here is %', quantity;  -- 在这里的数量是 80
   END;

   RAISE NOTICE 'Quantity here is %', quantity;  -- 在这里的数量是 50

   RETURN quantity;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}

