## OllyDBG


### 常用快捷键

F2：设置/取消断点
F8：单步步过。
F7：步入 CALL 。
F4：运行到选定位置。
F9：运行。
CTR+F9：执行到返回。
ALT+F9：执行到用户代码。

### 找CALL

bp send 断点到发包地址入口


### 函数

send( SOCKET s, const char FAR* buf, int len, int flags);

简述:  向一个已连接的套接口发送数据.

参数:  s：     一个用于标识已连接套接口的描述字。
　　   buf：   包含待发送数据的缓冲区。
　　   len：   缓冲区中数据的长度。
　　   flags： 调用执行方式。