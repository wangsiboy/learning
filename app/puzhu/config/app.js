var path = require('path');

module.exports = {

	name: '股票助手',
	description: 'stock aides',
	keywords: 'stock',

    // 域名
    host: '6336338.com',
    
	// 程序运行的端口
	port: 8080,

	//TODO 务必修改
	cookieSecret: 'aides_secret', 
	auth_cookie_name: 'stock_aides',

	// mongodb 配置
    db: 'mongodb://127.0.0.1:12345/aides',
    db_name: 'aides',

}