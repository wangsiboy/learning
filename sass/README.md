# SASS

*安装*

```
ruby -v
gem list
gem sources -l
gem sources --remove https://rubygems.org/
gem sources -a https://ruby.taobao.org/

gem install sass
gem install compass

sass main.scss main.css
compass create learn-sass-init

```

*语法*

```
sass-convert main.scss main.sass

compass watch

默认utf-8编码

指定编码：@charset “UTF-8”;

声明变量
$headline-ff:Braggadocio,

函数
@function声明

代码块
@mixin  name(params)  {

}
调用
@include
@extend   %定义只用来继承的样式，不会编译生成

media query 可内嵌在css规则中
```