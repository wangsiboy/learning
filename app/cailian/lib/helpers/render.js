/**
 * 模版引擎渲染用到的方法
 */

var config = require('../../config');

//静态资源添加映射，可重定位
exports.staticFile = function (filePath) {
  if (filePath.indexOf('http') === 0 || filePath.indexOf('//') === 0) {
    return filePath;
  }
  return config.site_static_host + filePath;
};

//布局中使用，处理标示段落位置的方法 如：{{{_section.head}}} 
exports.section = function(name, options){
    if(!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
};

