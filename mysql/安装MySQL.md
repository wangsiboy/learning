yum list mysql-server


当只有一个时候就可以直接
yum install mysql-server
进行安装

设置Mysql的服务
先启动Mysql服务 
service mysqld start 
连接一下试一下，直接
mysql
然后
\q
关闭连接

加强 MySQL 安全设置
sudo mysql_secure_installation 

设置Mysql开机启动
chkconfig mysqld on 
查看所有自动启动服务
chkconfig --list
如果没有添加到chkconfig列表中
chkconfig --add mysqld 
chkconfig mysqld on 


开启3306端口
/sbin/iptables -I INPUT -p tcp --dport 3306 -j ACCEPT 
删除规则，关闭3306端口
iptables -D INPUT -p tcp -m state --state NEW -m tcp --dport 3306 -j ACCEPT 
保存
/etc/rc.d/init.d/iptables save 

修改密码并设置远程访问
连接mysql数据库
设置密码
use mysql;
update user set password=password('123456') where user='root'; 
flush privileges; 

设置Mysql远程访问
grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;

解决Mysql乱码问题
找一个配置文件，复制到/etc/目录，命名为my.cnf
（有时候没有my.cnf）
cp /usr/share/doc/mysql-server-5.1.73/my-medium.cnf /etc/my.cnf
vim my.cnf
在[client]和[mysqld]下面都添加上
default-character-set=utf8 
最后按Esc输入
:wq
保存退出

最后重新启动服务就可以了
service mysqld restart


确保设置成功，我们检查一下：
mysql -uroot -p
输入指令： show variables like 'char%';，输出是否如下所示：
 
再输入指令：show variables like 'collation%'; 检查一下结果：
 
搞定 MySQL 了！

创建ghost数据库：mysql -uroot -p -e 'create database ghost;'   
