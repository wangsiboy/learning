// +----------------------------------------------------------------------
// | 股票助手
// +----------------------------------------------------------------------
// | 应用入口
// +----------------------------------------------------------------------
// |
// +----------------------------------------------------------------------
// | Author: WangSi <50208308@qq.com> on 15/4/3.
// +----------------------------------------------------------------------

/**
 * 模块依赖
 */

var express = require('express');
var app = express();
var config = require('./config/app');
var _ = require('lodash');
var Loader = require('loader');
var path = require('path');

//静态文件
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'bower_components')));

/**
 * 分配static, dynamic helpers
 */
_.extend(app.locals, {
  config: config,
  Loader: Loader
});

//解析URL编码体
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//使用cookie
app.use(require('cookie-parser')(config.cookieSecret));

//会话
var session = require('express-session');

//端口
app.set('port', process.env.PORT || config.port);

//用MongoDB存储会话数据
var MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: config.cookieSecret,
    store: new MongoStore({
        url: config.db
    }),
    resave: true,
    saveUninitialized: true
}));
