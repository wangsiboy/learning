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

```

*编译*

```
sass main.scss main.css

compass create learn-sass-init
cd learn-sass-init
compass watch

To import your new stylesheets add the following lines of HTML (or equivalent) to your webpage:
<head>
  <link href="/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
  <link href="/stylesheets/print.css" media="print" rel="stylesheet" type="text/css" />
  <!--[if IE]>
      <link href="/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
  <![endif]-->
</head>

```
*** css
can i use 网站

## config.rb
配置输出的css文件格式
output_style 

使用相对路径
relative_assets = true

*语法*

```
sass-convert main.scss main.sass

默认utf-8编码

指定编码：@charset “UTF-8”;

声明变量
$headline-ff:Braggadocio;

函数
@function声明
inline-image('logo.png');
image-url("logo.png");

代码块
@mixin  name(params)  {

}
调用
@include
@extend   %定义只用来继承的样式，不会编译生成

media query 可内嵌在css规则中
```