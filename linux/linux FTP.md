FTP

ps -ef |grep vsftpd

yum install vsftpd -y

vim /etc/vsftpd/vsftpd.conf
改NO

chkconfig —list

chkconfig —level 35 vsftpd on

useradd ftpadmin -s /sbin/nologin -d /home/www/
passwd ftpadmin
ls -lrth
chown ftpadmin www
service vsftpd start

## 在linux中添加ftp用户，并设置相应的权限

安装

$ sudo apt-get install vsftpd
查看是否打开21端口

$ sudo netstat -npltu | grep 21
tcp        0      0 0.0.0.0:21              0.0.0.0:*               LISTEN      15601/vsftpd    
登录

ftp localhost
输入Ubuntu的用户名、密码登录

ls
会显示home目录的文件

sudo service vsftpd start
在linux中添加ftp用户，并设置相应的权限，操作步骤如下：

1、环境：ftp为vsftp。被限制用户名为test。被限制路径为/home/test

2、建用户：在root用户下：

useradd -d /home/test test //增加用户test，并制定test用户的主目录为/home/test
passwd test //为test设置密码

3、更改用户相应的权限设置：

usermod -s /sbin/nologin test //限定用户test不能telnet，只能ftp
usermod -s /sbin/bash test //用户test恢复正常
usermod -d /test test //更改用户test的主目录为/test

4、限制用户只能访问/home/test，不能访问其他路径

修改/etc/vsftpd/vsftpd.conf如下：

chroot_list_enable=YES //限制访问自身目录
# (default follows)
chroot_list_file=/etc/vsftpd/vsftpd.chroot_list

编辑 vsftpd.chroot_list文件，将受限制的用户添加进去，每个用户名一行

改完配置文件，不要忘记重启vsFTPd服务器
[root@linuxsir001 root]# /etc/init.d/vsftpd restart
