# 变量

isset($变量) 判断变量是否存在，值为null不存在,false。
unset($变量) 断开变量与数据的联系

php中所有变量，默认值传递。

### 引用：&

$v1 = 10;
$v2 = &$1;
$v2++;

### 可变变量

$v1 = "abc"; //变量名
$abc = 10;
echo $$v1; // --> $abc

### 预定义变量

$_GET get方式提交数据的集合

echo "<pre>"
var_dump($_GET);  //输出数组的详细信息
echo "</pre>"

$_POST

$_REQUEST 

$_SERVER 请求信息和设置信息

- REMOTE_ADDR
- SERVER_ADDR
- DOCUMENT_ROOT 站点绝对路径
- PHP_SELF 当前网页的文件路径
- QUERY_STRING get请求字符串

<?php
echo "<table border="1">";
foreach($_SERVER as $key => $value) {
	echo "<tr>";
	echo "<td>$key</td>";
	echo "<td>$value</td>";
	echo "</tr>";
}
echo "</table>";
?>

$GLOBALS 自定义全局变量

# 常量

通常大写

define("常量名", 值);

const 常量名 = 值;
const只能在“最顶层”代码域中使用（不能在｛｝中用）

判断是否存在：defined()

### 预定义常量

有些需要打开模块才有（mysql模块）

- PHP_INT_MAX 
- PHP_VERSION
参考手册》附录》保留字列表》预定义常量

### 魔术常量

随环境等变化的常量

- __DIR__  当前网页文件的目录
- __FILE__ 当前网页文件
- __LINE__ 当前行