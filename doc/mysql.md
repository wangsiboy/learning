启动、停止、移出MYSQL服务
  启动MYSQL服务：net start mysql
  停止MYSQL服务：net stop mysql
  移出mysql服务：mysqld -remove
这里启动服务，方便下一步操作。
修改root密码：
运行中输入cmd ，跳到安装目录/bin下,
D:\wamp\mysql\bin>mysql -uroot
mysql>show databases; 
mysql>use mysql;
mysql>delete from User where User="";
mysql>update User set Password=PASSWORD('newpassword') where User='root';
mysql>FLUSH PRIVILEGES; 
mysql>quit;
FLUSH PRIVILEGES:强制让MySQL重新加载权限，即刻生效
此时登录时可用如下命令：
D:\wamp\mysql\bin>mysql -uroot -p
ENTERPASSWORD:newpassword
8
8：常用命令
mysql>show databases;       显示所有表
mysql>use mysql;            切换到表mysql         
mysql>show tables;          显示表的结构