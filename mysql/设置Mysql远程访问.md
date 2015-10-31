

设置Mysql远程访问
grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;
flush privileges; 

1、导入rpmforge的GPG密钥 
rpm --import http://dag.wieers.com/rpm/packages/RPM-GPG-KEY.dag.txt

2、安装（可以先通过 uname -a 命令查看机器的版本）
X86_64使用命令
yum install http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.2-2.el6.rf.x86_64.rpm

 i386使用命令
 yum install http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.2-2.el6.rf.i686.rpm

3、安装phpMyAdmin
 yum install phpmyadmin

 4、配置phpMyAdmin

vi /etc/phpMyAdmin/config.inc.php

 /*找到一下并将 cookie 修改成 http*/
/* Authentication type */  
$cfg['Servers'][$i]['auth_type'] = 'http';  


配置Nginx的server host

vi /etc/nginx/conf.d/phpmyadmin.conf

#
# phpmyadmin
#
server {
listen       8090;
server_name  qiche.6336338.com;
root   /usr/share/phpMyAdmin;

location / {
index  index.php index.html index.htm;
}


# pass the PHP scripts to FastCGI server listening on 127.0.0.1:8888
location ~ \.php$ {
    fastcgi_pass   127.0.0.1:8888;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    include        fastcgi_params;
}

}

