# Node

操作DOM的模块

```
var Node = require('node');
var $ = Node.all; 
var $test = $('#J_Test');
$test.length && $test.text('选择器命中节点数：'+$test.length);

var $one = Node.one('#J_One');
$one.text('Node.one() 用于获取一个节点');
```
操作DOM前请通过length判断节点是否存在

### 常用选择器

* id 选择器
只有在明确是唯一节点的情况下，使用 id 作为选择器。

* class 选择器
```
<div class="J_Tip">这是个提示</div>
```
获取此节点：
```
var $tip = $('.J_Tip');
```
* 子孙选择器
```
<div class="J_Parent">
    <span class="J_Child"></span>
</div>

<div class="J_Parent">
    <span class="J_Child"></span>
</div>
```

```
var $child = $(".J_Parent .J_Child");
S.log($child.length) 
//2
```

只想获取子节点呢？
使用 css 的 “>” 子选择器。
```
var $child = $(".J_Parent > .J_Child");
S.log($child.length); 
//1
```
精确选取
```
//使用 css3 的 :first-child 选择器
var $first = $(".J_Parent > li:first-child");

//使用 css3 的 :nth-child(index) 选择器 ，index 从 1 开始
var $two = $(".J_Parent > li:nth-child(2)");

var $last = $(".J_Parent > li:last-child");
```

* 相邻兄弟选择器 “+”
```
var $p = $('.J_Brother + p');
```

* 伪类选择器

```
//选取被选中的复选框节点
var $checkbox = $('.J_Checkbox:checked');

//获取被禁用的节点
var $disabled = $('.J_Checkbox:disabled');
```

* 非选择器
```
//使用 :not(selector) 
var $p = $('p:not(.J_Brother)');
```

### 节点添加到容器

将html片段字符串，以dom的形式渲染到指定父容器中，比如ajax请求回来数据，跟模板结合，然后插入到页面中。

容器：
```
<div class="J_Wrapper">
    <p>我是第一个节点</p>
</div>
```

html() 方法，html() 会清空容器下的节点，替换成 html 内容：
```
var html = '<div>我是新节点</div>';
$('.J_Wrapper').html(html);

//追加节点, 通过 $('html片段')，将html片段转成NodeList。
var $html = $('<div>我是新节点</div>');
$('.J_Wrapper').append($html);

//节点之前追加
var $el = $('.J_Wrapper').prepend($html);
//$el 的值其实是 $('.J_Wrapper') NodeList 对象。

var $el = $html.appendTo('.J_Wrapper');
//appendTo() 是子节点发起，向父容器追加内容，返回的 $el 指向子节点
```

### 节点插入

* before() 方法

```
$('#J_One').before($('#J_Two'));
```
将某个节点插入到指定节点前面
返回的是指定节点

如果你要返回是插入后的节点呢？
```
$('#J_Two').insertBefore($('#J_One')).text('我是第二个节点，但我要当第一个');
```

* after()

后面插入节点, 同样也有 insertAfter() 

### 获取/设置宽度与高度

```
<div class="J_Size_1" style="width:200px;height:200px;padding:10px;margin:20px;background-color: #33be40;border:1px solid #00334d;">
    这是一个设置宽度与高度的容器
</div>

var $div = $('.J_Size_1');
var width = $div.width(); //200
var height = $div.height(); //200

//获取包含 padding 值的宽度与高度
var innerWidth = $div.innerWidth(); //220 把左右 padding 值加上
var innerHeight = $div.innerHeight(); //220 把上下 padding 值加上

//默认算值时只会把 border 加上，如果希望加上 margin 值，需要传递个 true 参数值。       
var outerWidth = $div.outerWidth(true); //262
var outerHeight = $div.outerHeight(true); //262

```

### 样式处理

添加css属性
```
$('.J_ChangeBg').css({
    'background-color':'black',
    'color':'white',
    'font-size':'16px'
})
```

获取css属性值
```
$('.J_ChangeBg').css("color");
```

更好地版本是，将样式抽到一个 class 下，通过给元素增加/删除 class 来控制样式。

```
$('.J_ChangeBg').on('mouseover',function(ev){ $(ev.target).addClass('hover'); })

$('.J_ChangeBg').on('mouseout',function(ev){
    $(ev.target).removeClass('hover');
})

$('.J_ChangeBg').hasClass('hover');
```

### 属性增/删

```
$('.J_Input').attr('disabled',true);
$('.J_Input').removeAttr('disabled');

//获取元素某个属性
$('.J_Input').attr('disabled'); // disabled  
$('.J_Input').prop('disabled'); //true

//是否拥有某个属性：
$('.J_Input').hasAttr('disabled')
```

### 自定义属性

获取元素然后间接获取数据。
最快捷的办法是，将数据作为元素的属性附加到元素中。
```
<button class="J_Btn">获取按钮data-name属性</button>

var $btn = $('.J_Btn');
$btn.attr('data-name','明河');

$btn.attr('data-name'); //明河
//attr() 附加的属性只能是字符

//将 Object 对象关联到元素上, 使用 data() 方法：
var $dataBtn = $('.J_DataBtn');
$Btn.data('data-author',{"name":"明河","email":"minghe36@126.com"});

var author = $dataBtn.data('data-author');

```

### 节点过滤

filter() 可以过滤出指定选择器的元素
```
<ul class="J_Filter">
    <li>javascript</li>
    <li>html</li>
    <li class="css">css</li>
</ul>

var $lis = $('.J_Filter').all('li');
//只取class=css的节点
var $css = $lis.filter('.css');
$('body').append('<p>过滤的结果：'+$css.text()+'</p>');

var $html = $lis.filter(function(item){
    if($(item).text() === 'html'){
        return true;
    }
});
```
有个test()方法跟filter()的传参如出一辙，用于判断节点是否符合过滤条件

### 快速获取元素的方法

children() 用于获取子元素
parent()       获取父节点
first() 与 last() 用于获取符合选择器的第一个、最后一个子节点。
prev() 与 next() 用于获取符合选择器的上一个、下一个节点。