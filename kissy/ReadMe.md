# Kissy框架

全局对象KISSY（这是kissy唯一注入的全局变量，不推荐添加额外的全局变量，万不得已可以挂载在KISSY对象下）。

```
<script src="//g.alicdn.com/kissy/k/1.4.7/seed-min.js" charset="utf-8"></script>
```

## kissy入门

教程：http://demo.kissyui.com/tutorial/ 

**Kissy的第一个核心思想：按需加载 ,也是前端性能优化的重要原则**

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
* 整体架构

Kissy是由三个部分组成的：Seed、Core、Components。

*Seed
Seed是种子，seed-min.js，Seed的核心是Loader（即模块加载器），所有的功能模块或Ui组件都是在Seed上开花结果

Seed还包含lang（工具模块，比如判断变量是否是数组等）、ua（终端判断，写hack和移动终端判断逻辑会用到），这二个部分非常简单，翻翻API就可理解。

*Core

Core包含Kissy的核心功能模块，比如非常常用的node（DOM操作）、io（ajax请求）、event（事件操作）、base（基类）等，很多功能模块的api非常像Jquery，熟悉Jquery的同学，上手毫无压力。
比较难且重要的模块是base与promise，base作为基类，在抽象出组件或通用方法时，非常有用，也是Kissy组件风格的本源，必须掌握。
promise是promise规范的实现，异步编程优化的优秀工具，已经融入到io操作中，所以也非常重要。

*Components

Kissy的组件，比如选项卡、日期选择、异步上传、图表、表单校验、弹出层、编辑器等。

## 学习资源

[官网](http://docs.kissyui.com/)

[kissy小组项目](https://github.com/kissyteam)

