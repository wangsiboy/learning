/**
 * 模块依赖
 */

var config = require('./config/app');

var express = require('express');
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
});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

// set up css/js bundling
var bundler = require('connect-bundle')(config);
app.use(bundler);


app.set('port', process.env.PORT || "8080");

var urlinfo = require('url').parse(config.host);
config.hostname = urlinfo.hostname || config.host;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

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

startServer();