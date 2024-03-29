// +----------------------------------------------------------------------
// | Gruntfile
// +----------------------------------------------------------------------
// |
// +----------------------------------------------------------------------
// |
// +----------------------------------------------------------------------
// | Author: WangSi <50208308@qq.com> on 15/4/3.
// +----------------------------------------------------------------------


module.exports = function(grunt){

	// load plugins
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-exec',
		'grunt-contrib-less',
		'grunt-contrib-uglify',
		'grunt-contrib-cssmin',
		'grunt-hashres',
		'grunt-lint-pattern',
	].forEach(function(task){
		grunt.loadNpmTasks(task);
	});

	// configure plugins
	grunt.initConfig({
		cafemocha: {
			all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }}
		},
		jshint: {
			app: ['cailian.js', 'public/js/**/*.js',
				'models/**/*.js', 'controllers/**/*.js'],
			qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js']
		},
		exec: {
			linkchecker: { cmd: 'linkchecker http://localhost:8080 -q --ignore-url=/about --no-warnings' }
		},
		less: {
			development: {
				options: {
					customFunctions: {
						static: function(lessObject, name) {
							return 'url("' +
								require('./lib/static.js').map(name.value) +
								'")';
						}
					}
				},
				files: {
					'public/css/header.css': 'less/header.less',
					'public/css/main.css': 'less/main.less'
				}
			}
		},
		uglify: {
			all: {
				files: {
					'public/js.min/cailian.min.js': ['public/js/**/*.js']
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/css/cailian.css': ['public/css/**/*.css',
					'!public/css/cailian*.css']
				}
			},
			minify: {
				src: 'public/css/cailian.css',
				dest: 'public/css/cailian.min.css'
			}
		},
		hashres: {
			options: {
				fileNameFormat: '${name}.${hash}.${ext}'
			},
			all: {
				src: [
					'public/js.min/cailian.min.js',
					'public/css/cailian.min.css',
				],
				dest: [
					'config.js',
				]
			}
		},
		lint_pattern: {
			view_statics: {
				options: {
					rules: [
						{
							pattern: /<link [^>]*href=["'](?!\{\{|(https?:)?\/\/)/,
							message: 'Un-mapped static resource found in <link>.'
						},
						{
							pattern: /<script [^>]*src=["'](?!\{\{|(https?:)?\/\/)/,
							message: 'Un-mapped static resource found in <script>.'
						},
						{
							pattern: /<img [^>]*src=["'](?!\{\{|(https?:)?\/\/)/,
							message: 'Un-mapped static resource found in <img>.'
						},
					]
				},
			files: {
				src: [ 'views/**/*.hbs' ]
		   }
		},
		css_statics: {
			options: {
				rules: [
					{
						pattern: /url\(/,
						message: 'Un-mapped static found in LESS property.'
					},
				]
			},
			files: {
				src: [
					'less/**/*.less'
				]
			}
		}
	 }
	});	

	// register tasks
	grunt.registerTask('default', ['cafemocha','jshint','exec', 'lint_pattern']);
	grunt.registerTask('static', ['less', 'cssmin', 'uglify', 'hashres']);
};
