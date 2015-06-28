# Kissy框架

全局对象KISSY（这是kissy唯一注入的全局变量，不推荐添加额外的全局变量，万不得已可以挂载在KISSY对象下）。

```
<script src="//g.alicdn.com/kissy/k/1.4.7/seed-min.js" charset="utf-8"></script>
```

## kissy入门

教程：http://demo.kissyui.com/tutorial/ 

** Kissy的第一个核心思想：按需加载 ,也是前端性能优化的重要原则。**

J_Xx的形式，表示有js的DOM操作

```
<p class="J_Wrapper">我是调皮的容器</p>

Jquery版实现：
$('.J_Wrapper').html('Hello Kissy！');

Kissy版本的实现：
//使用node模块操作DOM
KISSY.use('node',function(S,Node){
    //使用all方法可以获取指定选择器节点
    //可以理解为Jquery的$方法
    var $ = Node.all;
    $('.J_Wrapper').html('Hello Kissy！');
})
Kissy版本的代码相对于Jquery版本的代码，多了个KISSY.use() 的包裹。

```


## 学习资源

[官网](http://docs.kissyui.com/)

[kissy小组项目](https://github.com/kissyteam)

