Linux下解压rar格式的压缩文件

如果需要在Linux系统下解压RAR格式的压缩包，需要安装Linux版本的rar程序。

具体安装步骤如下：

wget http://www.rarlab.com/rar/rarlinux-3.8.0.tar.gz

tar zxvf rarlinux-3.8.0.tar.gz
cd rar
make

make install 


安装完毕后通过"rar x 文件.rar"即可解压