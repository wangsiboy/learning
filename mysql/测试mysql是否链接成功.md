测试mysql是否链接成功的php代码
<?php
$con = mysql_connect("10.0.@.@@","@@","@@");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
 
mysql_select_db("mydb", $con);
 
$result = mysql_query("SELECT * FROM sys_user");
 
while($row = mysql_fetch_array($result))
  {
  echo $row['UserName'] . " " . $row['PassWord'] . " " . $row['id'];
  echo "<br />";
  }
 
mysql_close($con);
?>
可以把上面的代码传入目录/var/www/html/
就可以看到执行情况