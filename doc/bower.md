1. bower安装
全局安装npm install bower –g
2.命令
命令行中输入bower查看
1)	cache:bower缓存管理
2)	help:显示Bower命令的帮助信息
3)	home:通过浏览器打开一个包的github发布页
4)	info:查看包的信息
5)	init:创建bower.json文件
6)	install:安装包到项目
7)	link:在本地bower库建立一个项目链接
8)	list:列出项目已安装的包
9)	lookup:根据包名查询包的URL
10)	prune:删除项目无关的包
11)	register:注册一个包
12)	search:搜索包
13)	update:更新项目的包
14)	uninstall:删除项目的包

3. bower使用
安装到项目
>bower install jquery
>bower uninstall jquery
>bower install jquery#1.7.2
>bower update jquery
.bowerrc文件
{
  "directory": "public/vendor",
  "json": "bower.json"
}
查看项目中已导入的类库bower list
查看本地bower已经缓存的类库 bower cache list
查看D3库信息bower info d3
查看dojo库的url >bower lookup dojo
查询包含dojo的类库 bower search dojo

4. 用bower提交自己类库
1). 生成bower.json配置文件
bower init
2). 在github创建一个资源库：nodejs-bower
3). 本地工程绑定github
git init
git remote add origin https://github.com/bsspirit/nodejs-bower
git push -u origin master
4). 注册到bower官方类库
bower register nodejs-bower git@github.com:bsspirit/nodejs-bower.git

