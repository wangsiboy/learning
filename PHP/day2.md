### 整数

dec: 10进制
bin: 2进制
oct: 8进制
hex: 16进制

### String

‘’ 转译字符 \\ \'
""         \\ \" \n \r \t \$
""内自动识别$字符串，为变量

nowdoc （单引号）定界符字符串

$str = <<<'ABC'
写啥是啥
ABC;

heredoc

### boolean

PHP手册>附录>类型比较表>使用php函数对变量$x进行比较

### 数组

foreach(数组名 as $key => $value) {
  
}


setType(,) getType() 

isSet() unSet() empty() 

is_XX() 

is_int() 
is_numeric() 
is_scalar() 是否为标量类型 int float string bool

### 错误控制运算符 @
$link = @mysql_connect('localhost', 'root', '123456') or die("mysql connect fail");

### include

getcwd() 当前目录
get_include_path()
set_include_path()

### 错误处理

E_USER_NOTICE
E_USER_WARNING
E_USER_ERROR
trigger_error("info", E_USER_NOTICE);
ini_set('display_errors', 0);
str_pad(decbin(E_ERROR), 16, '0', STR_PAD_LEFT);
php.ini
error_reporting = E_ALL | E_STRICT & ~E_NOTICE

set_error_handler("myErrorHandler");

### 函数

var_dump()函数 不定参数
function_exists();
func_get_args();
func_get_arg(n);
func_num_args();


