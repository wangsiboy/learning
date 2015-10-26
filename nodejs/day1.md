### 第一个应用：

```
var http=require('http');

http.createServer(function(req,res) {
  res.writeHead(200,{'Content-Type':'text/html'});
  res.write('<h1>Node.js</h1>');
  res.end('<p>app is running</p>');
}).listen(3000);

console.log("Http server is listening at port 3000");
```

### 调试：
npm install -supervisor -g
使用supervisor app.js 启动，修改代码后不需要重启。

### 读取文件

异步

```

var fs = require('fs');
fs.readFiled('file.txt', 'utf-8', function(err, data) {
	if(err) {
	    console.log(err);
    } else {
        console.log(data);
    }
});
console.log('end');

```

同步

```

var fs = require('fs');
var data = fs.readFiledSync('file.txt', 'utf-8');
console.log(data);
console.log('end');

```

http://nodejs.org/api