// +----------------------------------------------------------------------
// | 财联网站应用入口
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

//全局配置数据
var config = require('./config');

var _ = require('lodash');
// set static
_.extend(app.locals, {
    config: config
});

//端口
app.set('port', process.env.PORT || config.port);

// 模版引擎
var render_helpers = require('./lib/helpers/render.js');
var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    extname:'.hbs'
    helpers: render_helpers
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');


//添加路由
require('./routes.js')(app);


var http = require('http');

http.createServer(app).listen(app.get('port'), function() {
    console.log("====== The application listening on port %d in %s mode", config.port, app.settings.env);
    console.log("====== You can debug your app with host name + " + ':' + config.port);
});