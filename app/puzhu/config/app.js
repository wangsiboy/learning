
module.exports = {

	name: '股票助手',
	description: 'stock aides',
	keywords: 'stock',

    // 域名
    host: 'localhost',
    
	// 程序运行的端口
	port: 8080,

	//TODO 务必修改
	cookieSecret: 'aides_secret', 
	auth_cookie_name: 'stock_aides',

	// mongodb 配置
    db: 'mongodb://127.0.0.1:12345/aides',
    db_name: 'aides',

    //定义js和css的打包
    bundles: {
    	clientJavaScript: {
			main: {
				file: '/js/main.min.js',
				location: 'head',
				contents: [
					'/js/main.js',
				]
			},
			mobile: {
				file: '/js/main-mobile.min.js',
				location: 'beforeCloseBody',
				contents: [
					'/js/main-mobile.js'
				]
			}
		},
		clientCss: {
			main: {
				file: '/css/style.min.css',
				contents: [
					'/css/header.css',
					'/css/style.css',
				]
			},
			mobile: {
				file: '/css/style-mobile.min.css',
				contents: [
					'/css/style-mobile.css'
				]
			}
		}
    },
    use: {
		main: function(req,res) {
			return !req.isMobile;
		},
		mobile: function(req,res) {
			return req.isMobile;
		}
	}

}