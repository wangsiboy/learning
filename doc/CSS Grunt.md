CSS Grunt

npm install —save-dev grunt-contrib-less

grunt.initConfig中添加生成css的less文件
运行 
grunt less
grunt cssmin
grunt uglify
grunt hashres
grunt.registerTask('static', ['less', 'cssmin', 'uglify', 'hashres']);
多个任务运行
grunt static