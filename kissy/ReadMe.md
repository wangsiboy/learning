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

### kissy工程构建器 — Bee

[generator-bee](http://gallery.kissyui.com/guide/generator-bee使用教程.html)

* 安装 generator-bee

先安装 yeoman（前端工作流脚手架）和 gulp (前端构建打包工具)： 
npm install yo gulp -g 

再安装 bee： 
npm install generato

* 使用 Bee 生成目录和代码

创建个名为bee-demo的目录，进入该目录，运行如下命令：
yo bee 

bee 脚手架采用gulp 构建工程。所以我们需要gulp将src的模块代码编译到build目录下。

在工程目录下，执行 gulp 命令，就会开始构建，同时会起一个本地的server。
http://localhost:5555

#### 使用抓包工具线上调试

[Fiddler](http://www.telerik.com/fiddler)、[Charles](http://www.charlesproxy.com/)、[LivePool](http://rehorn.github.io/livepool/)

#### kissy的调试模式

引入seed.js，相当于开启全局debug配置，等价于：KISSY.config('debug',true)

只开启一个包的debug模式
```
KISSY.config({
    packages: [
        {
            name: 'bee-demo',
            base: 'http://apebook.org/bee-demo/build',
            ignorePackageNameInUri: true,
            debug: true
        }
    ]}
);
```
根据debug配置来配置包路径

可以根据KISSY.config('debug');的值来覆盖包，达到临时调试的目的,同时又不影响线上代码。
```
KISSY.config({
    packages: [
        {
            name: 'bee-demo',
            base: 'http://apebook.org/bee-demo/build/',
            ignorePackageNameInUri: true
        }
    ]}
);

if(KISSY.config('debug')){
    KISSY.config({
        packages: [
            {
                name: 'bee-demo',
                base: '../build',
                ignorePackageNameInUri: true,
                combine:false
            }
        ]}
    );
}
```

###整体架构

Kissy是由三个部分组成的：Seed、Core、Components。

* Seed 

种子，seed-min.js

Seed的核心是Loader（即模块加载器），所有的功能模块或Ui组件都是在Seed上开花结果

Seed还包含lang（工具模块，比如判断变量是否是数组等）、ua（终端判断，写hack和移动终端判断逻辑会用到），这二个部分非常简单，翻翻API就可理解。

* Core

Core包含Kissy的核心功能模块，比如非常常用的node（DOM操作）、io（ajax请求）、event（事件操作）、base（基类）等，很多功能模块的api非常像Jquery，熟悉Jquery的同学，上手毫无压力。

比较难且重要的模块是base与promise，base作为基类，在抽象出组件或通用方法时，非常有用，也是Kissy组件风格的本源，必须掌握。

promise是promise规范的实现，异步编程优化的优秀工具，已经融入到io操作中，所以也非常重要。

* Components

Kissy的组件，比如选项卡、日期选择、异步上传、图表、表单校验、弹出层、编辑器等。

### 模块

演示代码，请勿使用这种方式定义模块。
```
<script>
    //定义一个模块
    KISSY.add('demo-mod',function(S,require,exports,module){
        var Node = require('node');
        var $ = Node.all;
        exports.test = function () {
            $('body').html('CommonJs');
        };
    });
    //使用模块
    KISSY.use('demo-mod',function(S,demo){
        demo.test();
    })
</script>
```

**Kissy规范：一个模块，一个js文件。**

```
KISSY.add(
    '模块名/路径',
    ['依赖的模块'],
    function(S,require, exports, module){
      //模块回调函数（在依赖模块加载完成后执行）
})
```
gulp-kmc 会自动生成
* 第一个参数为模块名称
* 第二个为依赖模块数组
* 模块回调函数 参数的含义
1. 留意：函数第一个参数永远是S（KISSY变量）
2. require 为加载依赖模块函数，比如 var Node = require('node');
3. exports 类似NodeJs的exports方法，导出（暴露）接口供外部使用
4. module.exports 类似NodeJs的module.exports，用于导出（暴露）接口供外部使用
会nodejs的人看到都呵呵了。在Kissy 中推荐使用 module.exports.

#### 主模块使用依赖模块

主模块 src/index.js 依赖于子模块 src/mods/header.js

index.js 的代码这么写：
```
//初始化header模块
var header = require('./mods/header'); //请使用相对路径
header.init();
```

#### 使用模块

使用KISSY.config({})配置个包，包名为 bee-demo，路径为 ../build 
```
KISSY.config({
    packages: [
        {
            name: 'bee-demo',
            base: '../build',
            ignorePackageNameInUri: true,
            debug: true,
            combine:false
        }
    ]}
);
```
KISSY.use() 使用指定模块
```
KISSY.use('bee-demo/index');
```
如果 use 的模块有返回对象
```
KISSY.use('模块名',function(S,Mod){
    new Mod();
})
```
#### 包配置

核心目的是配置 base 目录路径，将模块名称中的 bee-demo 映射到我们工程的 build 目录，这样 Kissy.use('bee-demo/index') 时就会自动找到 bee-demo/build/index-min.js 文件。

[参数说明](http://docs.kissyui.com/1.4/docs/html/api/loader/config.html)

* name 包名，即模块名称路径起始，比如 bee-demo/index 中的 bee-demo
* base 包所在的 url 路径, 如果是相对路径，就是相对于当前页面路径，Kissy会把模块名称拼接到 base 路径后
* ignorePackageNameInUri:true 可以在请求的模块路径中省去包名！
* combine 配置 
* debug 开启包调试，debug设置为true，可以让Kissy加载*.js源码文件

#### 加载模块css文件

```
require('bee-demo/index.css');
```
importStyle可以帮助你阻塞地加载所有依赖的样式，这样我们就可以在head部分优先加载样式，就不会出现样式变化问题。
```
<head>
    <!-- 引入seed和import-style -->
    <script src="http://g.tbcdn.cn/kissy/k/1.4.8/??seed-min.js,import-style-min.js"></script>
    <!-- 配置模块 -->
    <script>
    KISSY.config({
        packages: [
            {
                name: 'bee-demo',
                base: 'http://demo.apebook.org/bee-demo/build',
                ignorePackageNameInUri: true
            }
        ]}
    );
    </script>
    <!--引入样式-->
    <script>
        KISSY.importStyle('bee-demo/index.css');
    </script>
</head>
```

#### 使用combo配置减少请求

**性能优化的黄金法则：尽可能减少http请求，combo可以理解为合并静态资源文件的规则**

```
<script src="http://g.tbcdn.cn/kissy/k/1.4.8/??seed-min.js,import-style-min.js" data-config="{combine:true}"></script>
```
通过script标签上的 data-config ，可以快速配置kissy的loader，data-config="{combine:true}" 等价于：
```
<script>
    KISSY.config({
        combine:true
    );
</script>
```
也等价于：
```
<script>
    KISSY.config('combine',true);
</script>
```
除了可以控制kissy模块的combo，也可以控制业务模块的combo，比如有二个包x、y：
```
KISSY.config({
    // 开启自动 combo 模式
    combine:true,
    packages:{
        x:{
            base:'http://x.com/biz/'
        },
        y:{
           base:'http://x.com/biz/',
           // y 包不开启自动 combo
           combine:false
        }
    }
});
```

#### 别名机制

```
KISSY.config('modules',{
    'bee-demo/b':{
        alias:['bee-demo/a']
    }
});
```
业务模块 require('bee-demo/b') 等价于 require('bee-demo/a')

**modules** 别名配置经常应用于公共模块管理

比如 bee-demo 项目中引用了二个组件，组件的模块名称中包含版本号信息，像kg/offline/2.0.0/index，但我们不希望在业务模块 require 时带有版本号，require('kg/offline/index'),那么如何配置呢？
```
KISSY.config('modules',{
    'kg/offline/index':{
        alias:['kg/offline/2.0.0/index']
    },
    'kg/auth/index':{
        alias:['kg/auth/2.0.0/index']
    }
});
```

#### 使用依赖表控制combo

关键字是 **requires**

```
KISSY.use('kg/offline/2.0.0/index',function(s,Offline){
    //use 表单校验组件
    KISSY.use('kg/auth/2.0.0/index');
});

KISSY.config('modules',{
    'kg/offline/2.0.0/index':{
        requires:['kg/auth/2.0.0/index']
    }
});
```

依赖表 KMD 自动抽取

build目录就存在依赖表文件


## 学习资源

[官网](http://docs.kissyui.com/)

[kissy小组项目](https://github.com/kissyteam)

