# event模块

### 绑定与解除事件

```
$('.J_On').on('click',function(ev){
    //点击事件处理器
})
```

使用on(eventName,handler)绑定事件:

* eventName 事件名称

常用的有click、tap（手机页面的点击）、
focusin（获取焦点）、
focusout（失去焦点）、
mouseenter（鼠标移入）、
mouseleave（鼠标移出）等

* handler 事件处理器，留意ev的数据

```
//ev.target 指向被点击的节点
var $target = $(ev.target);

//currentTarget永远指向事件源：
var $currentTarget = $(ev.currentTarget);

//绑定多个事件, 使用空格隔开。
$('.J_Hover').on('mouseenter mouseleave',function(ev){
    var $target = $(ev.target);
    if(ev.type === 'mouseenter'){
        $target.text('mouseenter');
    }else if(ev.type === 'mouseleave'){
        $target.text('mouseleave');
    }
})

//解除事件的绑定
$('.J_Hover').detach('mouseenter');

//解绑某个事件监听器，使用detach的第二个参数：
$('.J_Target').detach('click',clickHandler);
```

### 事件代理

delegate(eventType,selector,handler)

* eventType 事件类型
* selector 子孙节点选择器
* handler 事件监听器

使用delegate() 将节点的事件统一委托给父节点，这样可以保证动态节点的节点，依旧存在事件监听，作用域是在父节点之内。

```
var Node = require('node');
var $ = Node.all;

$( "body" ).delegate( "click","p", function(ev) {
    $(this).append( "<p>添加一个段落</p>" );
});

//解除代理事件绑定可以使用undelegate()：
$( "body" ).undelegate( "click","p");
```

### 阻止事件冒泡和默认行为

使用stopPropagation()方法会阻止事件冒泡，建议使用halt()方法。

```
$('button').on('click',function(ev){
    ev.stopPropagation();
})
```

halt() 的作用是停止事件冒泡，同时停止默认行为，比如a标签的跳转、button的提交等。
如果你只想阻止默认行为，而不想阻止事件冒泡，可以使用 preventDefault() 方法  

### 让对象拥有事件能力

event模块带有Target对象，普通的对象可以混入Target对象来拥有事件的能力。常见于组件设计，kissy的组件基类base就混入了Target。

我们定义个Demo类：

```
var Node = require('node');
var $ = Node.all;
var Event = require('event');
function Demo(){
    //定义一个show事件
    this.publish("show",{
        bubbles:1
    });
}
S.augment(Demo, Event.Target,{
    show:function(){
        //触发show事件
        this.fire('show',{isShow:true});
    }
});

module.exports = Demo;
```

使用S.augment()方法，可以将对象混入到类的原型中。

```
S.augment(Demo, Event.Target);
```

Demo混入Event.Target对象。

在Demo构造器中定义事件：

```
this.publish("show",{
    bubbles:1
});
```

bubbles 设置为true时，允许事件冒泡。

实际上publish()不是必须的。

当外部调用Demo的show()方法时，触发自定义事件show：
```
show:function(){
    //触发show事件
    this.fire('show',{isShow:true});
}
```
this.fire(eventType,data) 用于触发自定义事件。
* eventType 自定义事件名称
* data 广播到外部的数据

外部就可以监听show这个自定义事件：
```
var demo = new Demo();
demo.on('show',function(ev){
    $('body').append('<p>触发了自定义事件show，isShow:'+ev.isShow+'</p>');
});
```
如果没有publish()事件，监听动作必须在fire()之前。

**全局事件广播**

不推荐使用，只作为参考：

```
var globalEvent=S.mix({},S.EventTarget);
globalEvent.on('Login:session:pass', function(){
  isSessionPass = true;
});
```

### 触发表单事件

表单元素会带有默认事件，常用的有：

* submit：表单提交事件
* blur：失去焦点事件
* focus：获得焦点事件
* change：值改变触发的事件，常用于选择框
* select：比如输入框选中文字后触发

kissy没有jQuery触发这些事件的门面方法，比如$('input').blur()，但可以通过fire()方法来触发表单事件，比如：
```
$('input').fire('blur');
```
（PS:fire()可以触发任何浏览器支持的事件。）

处理表单提交

假设有个表单：
```
<form action="" class="J_Form">
    
</form>
```

form外部有个按钮，现在需要点击这个按钮触发表单的提交：
```
<p>
    <button class="J_Submit">提交表单</button>
</p>
```

使用fire()方法即可：
```
$('.J_Submit').on('click',function(){
    $('.J_Form').fire('submit');
});
```

现在又不希望表单提交了：
```
$('.J_Form').on('submit',function(ev){
    ev.halt();
    alert('我就不提交，哼╭(╯^╰)╮');
})
```

### 鼠标事件的处理

* click
* mouseenter
* mouseleave
* dblclick：双击事件
* mousedown：鼠标按下事件
* mousemove：鼠标移动事件
* mouseup：鼠标放开事件
* mouseover：鼠标经过事件
* mouseout：鼠标移开事件

**mouseenter&mouseleave与mouseover&mouseout的区别**
假设如下嵌套结构：
```
<div class="out J_Over">
    <span>over</span>
    <div class="in"></div>
</div>
```
在.J_Over节点上绑定mouseover事件：
```
var i = 0;
$( ".J_Over").on('mouseover',function(ev){
    var $target = $(ev.currentTarget);
    if(ev.type==='mouseover'){
        i++;
        $target.all('span').text('鼠标经过次数：'+i);
    }
});
```
in节点是over节点内部，但在in节点边缘进出，居然也触发了mouseover事件！
为了解决这个问题，就有了mouseenter事件：
```
var n = 0;
$( ".J_Enter").on('mouseenter',function(ev){
    var $target = $(ev.currentTarget);
    if(ev.type==='mouseenter'){
        n++;
        $target.all('span').text('鼠标经过次数：'+n);
    }
});
```

**鼠标位置**

在事件中我们可以很方便的获取到鼠标的位置：
```
$(document).on('mousemove',function(ev){
    S.log('x:'+ev.pageX+',y:'+ev.pageY);
});
```
pageX：鼠标当前位置相对文档左边界的距离
pageY：鼠标当前位置相对文档上边界的距离   

### 键盘事件的处理

常用的键盘事件有：
* keydown：键按下触发的事件
* keyup：键弹起触发的事件

**使用键盘事件，实现字数统计**

接下来我们使用键盘事件，来实现个小功能：记录input输入的字数。
```
<input type="text" value="" class="J_Input"/>
```
监听keyup事件：
```
$('.J_Input').on('keyup',function(ev){
    var val = $(ev.target).val();
    $('.J_Count').text(val.length);
})
```

**获取键码**

有时我们需要获取用户按下的键码来做些过滤处理：
```
$('.J_Input').on('keyup',function(ev){
    var code = ev.which;
    //空格键
    if(code === 32){
        //...        
    }
})
```
使用which属性即可获取到键码       