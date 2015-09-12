node工程创建步骤

文件夹通常用来存放软件源代码: 
cd /usr/src 

网址为：http://nodejs.org/download 
wget http://nodejs.org/dist/v0.10.18/node-v0.10.18.tar.gz 
https://nodejs.org/dist/v0.12.7/node-v0.12.7-linux-x64.tar.gz
tar zxf node-v0.10.18.tar.gz 
cd node-v0.10.18 
./configure 
make 

Node二进制文件应该放在/user/local/bin/node文件夹下 
make install 

linux，不得不手动开启80端口的访问授权。
查看CentOS防火墙信息：/etc/init.d/iptables status　　
添加对80端口的开放：
/sbin/iptables -I INPUT -p tcp --dport 80 -j ACCEPT
 
　　然后保存规则并重启防火墙：
　　/etc/rc.d/init.d/iptables save
　　/etc/init.d/iptables restart
 

npm init
git@github.com:wangsiboy/bnzy.git

sudo npm install --save-dev grunt
 npm install --save body-parser


http://expressjs.com/api.html

http://nodejs.org/api/http.html

编译
scons all -j 多核

npm install bower -g
bower install bootstrap 

3.安装图形处理工具软件

因为nodejs中 GM for node.js模块是处理图片，但依赖imagemagick；

sudo apt-get install  imagemagick