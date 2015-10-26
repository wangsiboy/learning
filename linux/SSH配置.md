SSH配置

将ssh的端口22改掉，另外，禁止root通过ssh登录服务器，并允许新建的普通管理员登录。

1
$ vi /etc/ssh/sshd_config　
找到 # Port 22 ，去掉＃并将22修改为1025到65536 之间的没被用到的端口号。 找到下面一行，并去掉注释符。

1
# PermitRootLogin yes
　　

在配置文件里添加

1
AllowUsers user1
保存后，退出文件编辑。 重启sshd

1
$ service sshd restart
下次登录，就要用新设定的端口号登录了。

1
$ ssh user1@ip -p port 　