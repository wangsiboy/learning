
var site = require('./controllers/site.js');
var pos = require('./controllers/pos.js');

module.exports = function(app) {

	// 主页
    app.get('/', site.index);

    //产品页面
    app.get('/pos/', pos.list);
    app.get('/pos/:id', pos.detail);

}