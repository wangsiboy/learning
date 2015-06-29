# io 模块

kissy的io模块，相当于jQuery的ajax功能，用于异步获取内容。

io的门面方法，比如get()、post()、getJSON()、jsonp()。

### jsonp请求

异步调用github的接口，获取一个仓库的信息。

```
var io = require('io');
io.jsonp('https://api.github.com/repos/minghe/auth',function(authData){
    $('body').append('<p>'+authData.name+'：'+authData.description+'</p>');
});
```

* url 接口url
* data 非必须，接口传参，会拼接到url的?后
* callback 请求成功后执行后的回调

最后的请求地址：https://api.github.com/repos/minghe/auth?_ksTS=1419861634311_19&callback=jsonp20。

* _ksTS 是kissy自动加上的时间戳，防止请求缓存
* callback 是jsonp使用的回调函数名，在不指定的情况下，kissy会自动生成。

kissy的io继承于Promise，所以上面demo的代码可以优化成：

```
io.jsonp('https://api.github.com/repos/minghe/auth').then(function(result){
    var authData = result[0].data;
    $('body').append('<p>'+authData.name+'：'+authData.description+'</p>');
    return data;
});
```

then() 会在请求成功后执行，留意回调的数据参数是一个数组，result[0]才是接口返回的数据。

demo的代码，还可以等价于：
```
io({
    type:"get",
    dataType: "jsonp",
    url: 'https://api.github.com/repos/minghe/auth',
    data: {},
    success: function(authData){
         $('body').append('<p>'+authData.name+'：'+authData.description+'</p>');
     }
});
```

* type 请求类型，可以设置为get、post，留意jsonp不是请求类型，jsonp是get请求类型
* dataType 请求返回的数据类型，常用的有 jsonp、json、xml、html、text、script
* url 接口地址
* data 接口传参
* success 请求成功后执行的回调

可以看到io参数比较多，简单的jsonp请求，使用io.jsonp()即可，但有几种情况无法使用：

* callback回调函数名需要指定
* 需要设置请求超时、请求失败时

比如指定callback名为github：
```
io({
    "jsonpCallback":"github"
});
```

不使用callback作为参数名：
```
io({
    "jsonp":"new-jsonp"
});
```
请求中的 callback=jsonp20 会替换成 new-jsonp=github。

设置请求超时时间：
```
io({
    "timeout":10
});
```
timeout 的单位是秒。

### getJSON

getJSON() 会以get方式发送一个请求，并将接口返回的接口解析成json。

```
var io = require('io');

io.getJSON('2.json').then(function(result){
    var data = result[0];
    $('body').append('<p>'+data.name+'来自'+data.location+'</p><p><img src="'+data.avatar_url+'" width="50"></p>');
    return data;
});
```
如果接口返回的数据格式并不是json，可以使用get()方法。


### post 表单

异步提交表单数据到服务器端

假设有个表单：

```
<form role="form" class="form-vertical J_Form" style="padding: 20px;" method="post" action="">
    <div class="form-group ">
        <label for="user" class="control-label">用户名</label>
        <input type="text" name="user" autocomplete="off" maxlength="60" class="J_User form-control input-lg" value="" max="60" placeholder="">
    </div>
    <div class="form-group ">
        <label for="email" class="control-label">邮箱</label>
        <input type="text" name="email" autocomplete="off" maxlength="60" class="J_Email form-control input-lg" value="" max="60" placeholder="">
    </div>
    <button type="submit" class="J_Submit btn btn-block btn-lg btn-success">提交</button>
</form>
```

点击“提交”按钮，我们不期望表单直接提交，而是异步提交：

```
$('.J_Submit').on('click',function(ev){
    ev.halt();
    io.post('3.json',{
        user: $('.J_User').val(),
        email: $('.J_Email').val()
    },'json').then(function(result){
        var data = result[0];
        if(data.success){
            $('body').html('异步post数据成功！');
        }
    })
})
```

加个form参数，该参数为表单的节点钩子，io会自动寻找表单下的所有字段，拼接成可提交的字符串。
io有个serialize()方法，就是用于序列化表单数据，而配置form，其实就是调用serialize()方法。
var data = io.serialize('.J_Form'); // user=xxx&email=xxx

### io的事件

页面中存在多个异步请求，它们的loading状态处理逻辑是一样的，请求中出现“正在加载中...”提示，请求完成，隐藏提示。
每个io()都加上 beforeSend 参数显得很笨拙，比如：

```
io({
    type:"get",
    url: url1,
    beforeSend: function(){
        //请求发送前触发的回调
        //显示菊花图
        //....
    }
})

io({
    type:"get",
    url: url2,
    beforeSend: function(){
        //....
    }
})
```

我们可以通过监听io的请求事件，来剥离loading的逻辑处理。
沿用第一节的demo，jsonp请求github接口，github的访问慢且不稳定，好的用户体验是请求过程中增加loading状态：

```
    var io = require('io');
    //请求发送前触发
    io.on('send',function(){
        $('.J_Loading').addClass('tip-show');
    });
    //请求完成后触发
    io.on('complete',function(){
        $('.J_Loading').removeClass('tip-show');
    });
```

（PS: io的事件对所有io请求都有效，是全局性的事件。）

常用的事件有：
* send 事件：请求发送前触发
* complete 事件：请求完成后触发（不管是请求失败还是成功都会触发）
* success 事件：请求成功后触发
* error 事件：请求失败后触发        

### io 技巧

 以下配置都不是必须的，但有些配置很实用。
io.setupConfig()

io.setupConfig()方法，可以给所有的io请求增加全局性的默认配置。
比如设置所有的io请求默认类型为get：

```
io.setupConfig({
    type:'get'
})
```

abort() 可以中断当前的请求：
```
var req1 = io.jsonp();
req1.abort();
```

cache

默认 io 请求是缓存数据的（除了 dataType 为 script 或 jsonp 时），即 cache:true。
如果不希望cache请求，设置 cache:false 即可，io会自动给url加上个时间戳。
context

io 有个非常实用的 context 配置，用途是配置io回调中的上下文指向：

```
io({
    type:"get",
    dataType: "jsonp",
    url: 'https://api.github.com/repos/minghe/auth',
    context: $('body'),
    success: function(authData){
        var data = authData.data;
        this.append('<p>'+data.name+'：'+data.description+'</p>');
    }
});
```

（PS: context 无法在then()中生效。）
async

默认io是异步请求，但也可以阻塞式请求，不建议配置，只在一些特殊的场景中使用，比如单元测试中为了方便做io测试。
headers

用于设置请求头，比如：
```
io({
headers:{
    "X-Requested-With": true
}
}) 
```
