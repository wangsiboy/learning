/**
 * 全部的应用程序配置均存放在这一个文件中
 * Author: WangSi <50208308@qq.com> on 15/4/3.
 */

module.exports = {

    name: '财联网络科技有限公司', // site name 名字
 	description: '为满足全国商户的银行卡付款业务，我们提供POS机的安装维护，耗材供应。同时，为商户提供活动推广、贷款、信用卡等咨询业务。', // 描述
    keywords: 'cailian,财联,pos,POS机,萍乡,财联网络,湖南,江西,萍乡财联,收单,收款,收钱,刷卡机,银联,6336338',

 	// 程序运行的端口
    port: 8080,

    // mongodb 配置
    db: 'mongodb://127.0.0.1:12345/cailian_wang',
    db_name: 'cailian_wang',

    // 添加到 html head 中的信息
     site_headers: [
         '<meta name="author" content="50208308@qq.com" />'
     ],
     cookieSecret: 'cailian_wang_secret', // 务必修改
     auth_cookie_name: 'cailian_wang',

	// cdn host
    site_static_host: '', // 静态文件存储域名
    // cdn host，如 http://cailian.qiniudn.com
    site_static_host: '', // 静态文件存储域名

    // 域名
    host: 'localhost',

    // 限制发帖时间间隔，单位：毫秒
    post_interval: 2000,

    // RSS配置
    rss: {
        title: 'CaiLian：财联网络',
        link: 'http://6336338.com',
        language: 'zh-cn',
        description: 'CaiLian：财联网络',
        //最多获取的RSS Item数量
        max_rss_items: 50
    },

    gmail: {
        user: 'your gmail username',
        password: 'your gmail password'
    },

    // 邮箱配置
    mail_opts: {
        host: 'smtp.6336338.com',
        port: 25,
        auth: {
            user: 'cl@6336338.com',
            pass: 'Cl6336338'
        }
    },
    // 默认的Google tracker ID，自有站点请修改，申请地址：http://www.google.com/analytics/
    google_tracker_id: '',
    // 默认的cnzz tracker ID，自有站点请修改
    cnzz_tracker_id: '',

    authProviders: {
        weibo: {
            development: {
                appId: 'your_app_id',
                appSecret: 'your_app_secret'
            }
        }
    },

    //定义js和css的打包
    bundles: {
        clientJavaScript: {
            main: {
                file: '/js.min/cailian.min.fa5ceaed.js',
                location: 'head',
                contents: [
                    '/js/contact.js',
                    '/js/cart.js',
                ]
            }
        },
        clientCss: {
            main: {
                file: '/css/cailian.min.b358f379.css',
                contents: [
                    '/css/header.css',
                    '/css/main.css',

                ]
            }
        }
    },

    //weibo app key
    weibo_key: 10000000,
    weibo_id: 'your_weibo_id',

    // 是否允许直接注册（否则只能走 github 的方式）
    allow_sign_up: true,

    // newrelic 是个用来监控网站性能的服务
    newrelic_key: 'yourkey',

    //7牛的access信息，用于文件上传
    qn_access: {
        accessKey: 'your access key',
        secretKey: 'your secret key',
        bucket: 'your bucket name',
        domain: 'http://{bucket}.qiniudn.com'
    },

    //文件上传配置
    //注：如果填写 qn_access，则会上传到 7牛，以下配置无效
    upload: {
        //path: path.join(__dirname, 'public/upload/'),
        url: '/public/upload/'
    }
}