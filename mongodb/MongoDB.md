MongoDB

第一种、用浏览器或者第三方工具下载
当前版本的下载地址： http://downloads.mongodb.org/osx/mongodb-osx-x86_64-2.4.6.tgz
 
第二种，打开终端，使用以下命令行下载：
curl http://downloads.mongodb.org/osx/mongodb-osx-x86_64-2.4.6.tgz > mongodb.tgz
 
2、解压下载下来的安装包
tar -zxvf mongodb-osx-x86_64-2.4.6.tgz 

3、将解压的安装文件移动到你所喜欢的位置
mv -n ~/Downloads/mongodb-osx-x86_64-2.4.6 ~/Applications/mongodb/
 
4、在根目录 / 下创建  data/db 目录，用于放置mongodb数据，并且给该目录设置权限
sudo mkdir -p /data/db
sudo chown -R  zhigui /data
 
5、启动mongodb 服务
 
进入安装存放的下载安装文件目录的bin文件夹 运行 ./mongod

6、打开另外一个终端，同样是进入bin 目录，运行 ./mongo