centos上安装nodejs

检查是否安装了epel

yum repolist
如果没有在结果中看到epel则通过yum命令安装
centos6.x请使用以下命令

yum install \
  http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm

centos7.x请使用以下命令

yum install \
  http://dl.fedoraproject.org/pub/epel/beta/7/x86_64/epel-release-7-0.2.noarch.rpm

安装好以上环境之后就安装nodejs以及npm

sudo yum install nodejs npm --enablerepo=epel
npm install -g express-generator