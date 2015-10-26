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
app.use(require('response-time')());
app.use(require('method-override')());
app.use(require('compression')());

//解析URL编码体
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//全局配置数据 //TODO: process.env.NODE_ENV === "production";
var config = require('./config');
var _ = require('lodash');
// set static
_.extend(app.locals, {
    config: config
});

//静态文件
var path = require('path');
app.use(express.static(__dirname + '/public'));

//端口
app.set('port', process.env.PORT || config.port);

// 模版引擎
var render_helpers = require('./lib/helpers/render.js');
var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    extname:'.hbs',
    helpers: render_helpers
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

// set up css/js bundling
var bundler = require('connect-bundle')(config);
app.use(bundler);

//使用cookie
app.use(require('cookie-parser')(config.cookieSecret));

//会话
var session = require('express-session');

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

//使用mongoose连接数据库
var mongoose = require('mongoose');
var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
mongoose.connect(config.db, opts);

app.use(require('connect-busboy')({
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
}));

var urlinfo = require('url').parse(config.host);
config.hostname = urlinfo.hostname || config.host;

//每个请求都在一个域中处理
app.use(function(req, res, next) {
    var domain = require('domain').create();
    //处理域中的错误
    domain.on('error', function(err) {
        console.error('DOMAIN ERROR CAUGHT\n', err.stack);
        try {
            //在5秒内进行故障保护关机
            setTimeout(function(){
                console.error('Fail safe shutdown.');
                process.exit(1);
            }, 5000);

            //从集群中断开
            var worker = require('cluster').worker;
            if(worker) worker.disconnect();

            //停止接收新请求
            server.close();

            try {
                //尝试使用Express错误路由
                next(err);
            } catch(error) {
                //尝试返回普通文本响应
                console.error('Express error mechanism failed.\n', error.stack);
                res.statusCode = 500;
                res.type('text/plain');
                res.end('Server error');
            }
        } catch(error) {
            console.error('Unable to send 500 response.\n', error.stack);
        }
    });

    domain.add(req);
    domain.add(res);
    domain.run(next);
});

//日志
switch(app.get('env')){
    case 'development':
        //彩色的开发日志
        app.use(require('morgan')('dev'));
        break;
    case 'production':
        app.use(require('express-logger')({
            path: __dirname + '/log/requests.log'
        }));

        app.set('view cache', true);
        break;
}

app.disable('x-powered-by');

//防范跨域请求伪造csrf攻击
var csurf = require('csurf');
app.use(csurf());
app.use(function(req, res, next){
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    next();
});

//添加路由
require('./routes.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

// error routes
switch(app.get('env')){
    case 'development':
        app.use(require('errorhandler')());
        break;
    case 'production':
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}

var http = require('http');

function startServer() {
    http.createServer(app).listen(app.get('port'), function() {
        console.log("====== The application listening on port %d in %s mode", config.port, app.settings.env);
        console.log("====== You can debug your app with http://" + config.hostname + ':' + config.port);
    });
}

if(require.main === module){
    startServer();
} else {
    module.exports = startServer;
}