// +----------------------------------------------------------------------
// | 应用入口
// +----------------------------------------------------------------------
// | 不涉及业务，服务器架子设置，其他应用可以直接拷贝
// +----------------------------------------------------------------------
// | 配置数据都放到config目录的app.js，修改它可以配置域名、端口、数据库等等
// +----------------------------------------------------------------------
// | Author: WangSi <50208308@qq.com> on 15/6/30.
// +----------------------------------------------------------------------

/**
 * 模块依赖
 */
var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');

var config = require('./config/app');
var render_helpers = require('./lib/render_helper.js');

var app = express();

/************************************************
 * 前端相关的设置
 ************************************************/

//静态文件
app.use(express.static(__dirname + '/public'));

// view engine setup
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    extname:'.hbs',
    helpers: render_helpers
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

// set up css/js bundling
var bundler = require('connect-bundle')(config);
app.use(bundler);

/***********************************************
 * 服务器的设置
 ***********************************************/

//端口
app.set('port', process.env.PORT || config.port);

app.use(require('response-time')());

//检查一个method是否被重写
app.use(require('method-override')());

//用 compression 中间件压缩和处理静态内容
app.use(require('compression')());

//不显示服务器的信息
app.disable('x-powered-by');

//解析URL编码体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//For multipart bodies
app.use(require('connect-busboy')({
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
}));

switch(app.get('env')){
    case 'development':
        //彩色的开发日志
        app.use(require('morgan')('dev'));

        break;
    case 'production':
        //日志
        app.use(require('express-logger')({
            path: __dirname + '/log/requests.log'
        }));

        app.set('view cache', true);
        break;
}

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

/**
 * 分配static, dynamic helpers
 */
_.extend(app.locals, {
  config: config
});

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

// +----------------------------------------------------------------------
// /route
// +----------------------------------------------------------------------

//防范跨域请求伪造csrf攻击
var csurf = require('csurf');
app.use(csurf());
app.use(function(req, res, next){
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    next();
});

// cheesy mobile detection
app.use(function(req, res, next){
    var ua = req.headers['user-agent'] || '';
    req.isMobile = !!ua.match(/mob/i);
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
            return res.status(500).send('500 status');
        });
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}

// error routes
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

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


