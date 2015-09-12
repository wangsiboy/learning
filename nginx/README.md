安装 Nginx


想在 CentOS 系统上安装 Nginx ，你得先去添加一个资源库，像这样：

vim /etc/yum.repos.d/nginx.repo
使用 vim 命令去打开 /etc/yum.repos.d/nginx.repo ，如果 nginx.repo 不存在，就会去创建一个这样的文件，打开以后按一下小 i 键，进入编辑模式，然后复制粘贴下面这几行代码，完成以后按 esc 键退出，再输入 :wq （保存并退出）

[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
完成以后，我们就可以使用 yum 命令去安装 nginx 了，像这样：

yum install nginx
安装好以后测试一下 nginx 服务：

service nginx status
应该会返回：

nginx is stopped （nginx 已停止）
再测试一下 nginx 的配置文件：

nginx -t
应该会返回：

nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
... syntax is ok，... test is successful，说明配置文件没问题，同时这个结果里你可以找到 nginx 的配置文件 nginx.conf 所在的位置。

操纵 nginx 服务

操纵服务，可以使用使用 service 命令，它可以启动（start），重启（restart），或停止服务（stop），比如要启动 nginx 服务：

service nginx start
服务启动以后，你就可以在浏览器上使用服务器的 IP 地址，或者指向这个地址的域名访问服务器指定的目录了。你会看到类似下面的这些文字。

Welcome to nginx! If you see this page, the nginx web server is successfully installed and working. Further configuration is required. For online documentation and support please refer to nginx.org. Commercial support is available at nginx.com. Thank you for using nginx.

配置 nginx 虚拟主机

安装完 nginx 以后，第一件想到的事应该就是去创建虚拟主机，虚拟主机允许我们在同一台服务器上运行多个网站，我们可以为不同的域名绑定不同的目录，访问这个域名的时候，会打开对应目录里面的东西。下面来看一下为 nginx 配置虚拟主机。先进入到 nginx 配置文件目录：

cd /etc/nginx/conf.d
复制这个目录里的 default.conf ，复制以后的名字可以使用你的虚拟主机名字。比如创建一个 nginx.ninghao.net 的虚拟主机。复制文件可以使用 cp 命令，像这样：

cp default.conf nginx.ninghao.net.conf
再去编辑一下这个复制以后的配置文件，可以使用 vim 命令：

vim nginx.ninghao.net.conf
你会看到像这样的代码：

server {
 listen 80;
 server_name localhost;
 #charset koi8-r;
 #access_log   /var/log/nginx/log/host.access.log main;
 location / {
 root /usr/share/nginx/html;
 index index.html index.htm;
}
...
}
server_name 就是主机名，也就是跟这个虚拟主机绑定在一块儿的域名，我事先把 nginx.ninghao.net 指向了服务器，这个虚拟主机就是为它准备的，所以，server_name 后面的东西就是 nginx.ninghao.net 。紧接着 server_name 下面可以是一个 root，就是这个虚拟主机的根目录，也就是网站所在的目录。比如我们要把 nginx.ninghao.net 这个网站的文件放在 /home/www/nginx.ninghao.net 下面，那么这个 root 就是这个路径。

然后去掉 location / 里面的 root 这行代码。再在 index 后面加上一种索引文件名，也就是默认打开的文件，这里要加上一个 index.php ，这样访问 nginx.ninghao.net 就可以直接打开 root 目录下面的 index.php 了。稍后我们再去安装 php 。修改之后，看起来像这样：

server {
 listen 80;
 server_name nginx.ninghao.net;
 root /home/www/nginx.ninghao.net;
 #charset koi8-r;
 #access_log /var/log/nginx/log/host.access.log main;

 location / {
 index index.php index.html index.htm;
 }
...
}
这个配置文件先修改到这，稍后，我们再回来继续修改一下它。保存一下，按 esc ，输入 :wp（保存并退出）。现在虚拟主机应该就可以使用了。主机的域名是nginx.ninghao.net，访问它的时候，打开的是 /home/www/nginx.ninghao.net 这个目录里面的东西，你可以在这个目录下放点东西。

重启 nginx 或者重新加载 nginx 可以让配置文件生效。

service nginx reload
现在，打开浏览器，输入你为虚拟主机设置的域名，看看是否能打开你指定的目录里的东西。



如果ecs上只放一个网站就直接修改default.conf文件，server_name不变其他修改方法同上。

proxy_pass http://127.0.0.1:8080; 将网站的访问全部转向了8080端口，NodeJS监听8080端口即可



【新看到的，没试过。安装Nginx只需要执行一段命令：apt-get install nginx。然后重启服务：service nginx restart，刷新网页就能看到提示了。】
进入 /etc/nginx/sites-available/ 目录设置配置文件。

cd /etc/nginx/sites-available/
touch ghost.conf
vim ghost.conf
3、将以下内容添加进去，然后保存。记得把域名更换成自己的。

server {  
    listen 80;
    server_name gh.freehao123.info;

    location / {
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   Host      $http_host;
        proxy_pass         http://127.0.0.1:2368;
    }
}