# git

## 简单的使用

### 把目录变成Git可以管理的仓库
git init

### 新建个.gitignore文件, 写上不想提交的内容。

### 把目录里的东西都提交管理
git add -A
git commit -m "first commit"

### 提交到github
git remote add origin https://github.com/wangsiboy/qianlifu.git
git push -u origin master

OK, 差不多就这样用.


## 学习笔记

git init命令把这个目录变成Git可以管理的仓库
git add -A
git commit
$ git commit -m "wrote a readme file"
$ git status 当前的状态
$ git diff HEAD -- readme.txt 
$ git diff readme.txt 
git log命令 显示从最近到最远的提交日志  --pretty=oneline参数
$ git log
当前版本回退到上一个版本使用git reset命令：

$ git reset --hard HEAD^
$ git reset --hard 3628164
git reflog用来记录你的每一次命令
$ git reflog
git checkout -- file可以丢弃工作区的修改

$ git checkout -- readme.txt
git reset HEAD file可以把暂存区的修改撤销掉（unstage），重新放回工作区：
$ git reset HEAD readme.txt

GitHub仓库之间的传输是通过SSH加密的，所以，需要一点设置：
$ ssh-keygen -t rsa -C “50208308@qq.com"
git remote add origin git@github.com:wangsiboy/bnzy.git
git pull git@github.com:wangsiboy/bnzy.git master
git push origin master
$ git push -u origin master
远程库是空的，我们第一次推送master分支时，加上了-u参数
$ git clone git@github.com:wangsiboy/bnzy.git
$ git checkout -b dev
git checkout命令加上-b参数表示创建并切换，相当于以下两条命令
$ git branch dev
$ git checkout dev
用git branch命令查看当前分支
会列出所有分支，当前分支前面会标一个*号。
$ git checkout master
切换回master分支
把dev分支的工作成果合并到master分支上
$ git merge dev
合并完成后，就可以放心地删除dev分支
$ git branch -d dev
git fetch --all
git reset --hard origin/master

