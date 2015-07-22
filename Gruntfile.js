// Generated on 2014-05-23 using generator-bones 0.0.4
'use strict';
var LIVERELOAD_PORT = 35730;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

// Modules order could be foundamental,
// so be careful
var myappModules = [
	'js/modules/*.js'
];

module.exports = function (grunt) {
	// Read site name (it-it, uk-en) from parameters. Default is "it-it".
	var env = grunt.option('env') || 'production';
	var site = grunt.option('site') || 'it-it';
	var siteParts = site.split('-');
	var market = siteParts[0];
	var language = siteParts[1];

	grunt.log.writeln('Environment: ' + env);
	grunt.log.writeln('Site: ' + site);
	grunt.log.writeln('Market: ' + market);
	grunt.log.writeln('Language: ' + language);

	if (env === 'cert') {
		grunt.log.writeln('Running in cert Environment');
	}

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	// show elapsed time at the end
	require('time-grunt')(grunt);

	// configurable paths
	var yeomanConfig = {
		src: 'src',
		build: 'build'
	};

	grunt.initConfig({
		yeoman: yeomanConfig,
		watch: {
			configFiles: {
				files: [ 'Gruntfile.js'],
				options: {
					reload: true
				}
			},
			compass: {
				files: ['<%= yeoman.src %>/css/**/*.{scss,sass}'],
				tasks: ['compass:server']
			},
			livereload: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'<%= yeoman.src %>/templates/{,*/}*.hbs',
					'{.tmp,<%= yeoman.src %>}/css/{,*/}*.css',
					'{.tmp,<%= yeoman.src %>}/js/{,*/}*.js',
					'<%= yeoman.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= yeoman.src %>/video/{,*/}*.{mp4}',
					'<%= yeoman.src %>}/translations/{,*/}*.json'
				],
				tasks: ['assemble', 'sass']
			}
		},
		connect: {
			options: {
				port: 9000,
				// change this to '0.0.0.0' to access the server from outside
				hostname: '0.0.0.0'
				// hostname: '192.168.1.134'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, yeomanConfig.src)
						];
					}
				}
			},
			test: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'test')
						];
					}
				}
			},
			build: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, yeomanConfig.build)
						];
					}
				}
			}
		},
		open: {
			server: {
				path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
			}
		},
		clean: {
			build: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.build %>/*',
						'!<%= yeoman.build %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},
		sass: {
			options: {
				sourcemap: true,
				lineNumbers: true
			}
		},
		compass: {
			options: {
				sassDir: '<%= yeoman.src %>/css',
				cssDir: '.tmp/css',
				generatedImagesDir: '.tmp/images/generated',
				imagesDir: '<%= yeoman.src %>/images',
				javascriptsDir: '<%= yeoman.src %>/js',
				fontsDir: '<%= yeoman.src %>/css/fonts',
				importPath: '<%= yeoman.src %>/bower_components',
				httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				httpFontsPath: '/css/fonts',
				relativeAssets: false,
				debugInfo: true,
				outputStyle: 'expanded',
				noLineComments: false
			},
			build: {
				options: {
					generatedImagesDir: '<%= yeoman.build %>/images/generated',
					outputStyle: 'compressed',
					noLineComments: true
				}
			},
			server: {
				options: {
					debugInfo: true,
					noLineComments: false
				}
			}
		},
		// not used since Uglify task does concat,
		// but still available if needed
		concat: {
			// List of modules to build. Order is important, a module could have dependencies.
			modules: {
				files: {
					'<%= yeoman.build %>/js/modules.js': myappModules.map(function(m) {
						return '<%= yeoman.src %>/' + m;
					})
				}
			}
		},
		uglify: {
			// List of modules to build. Order is important, a module could have dependencies.
			modules: {
				files: {
					'<%= yeoman.build %>/js/modules.js': myappModules.map(function(m) {
						return '<%= yeoman.src %>/' + m;
					})
				}
			}
		},
		rev: {
			build: {
				files: {
					src: [
						'<%= yeoman.build %>/js/**/*.js',
						'<%= yeoman.build %>/css/{,*/}*.css',
						'<%= yeoman.build %>/css/fonts/*',
						'<%= yeoman.build %>/video/*.{mp4,swf}'
					]
				}
			}
		},
		assemble: {
			options: {
				flatten: true,
				layout: 'default.hbs',
				layoutdir: '<%= yeoman.src %>/templates/layouts',
				partials: '<%= yeoman.src %>/templates/partials/*.hbs',
				data: '<%= yeoman.src %>/translations/' + site + '/data.json',
				site: site,
				market: market,
				language: language
			},
			pages: {
				files: {
					'<%= yeoman.src %>/': ['<%= yeoman.src %>/templates/pages/*.hbs', '!<%= yeoman.src %>/templates/pages/index.hbs']
				}
			},
			hp: {
				options: {
					layout: 'home_private.hbs'
				},
				files: {
					'<%= yeoman.src %>/': ['<%= yeoman.src %>/templates/hp/*.hbs']
				}
			},
			login: {
				options: {
					layout: 'login_registration.hbs',
				},
				files: {
					'<%= yeoman.src %>/': ['<%= yeoman.src %>/templates/login_registration/*.hbs']
				}
			},
			index: {
				files: {
					'<%= yeoman.src %>/': ['<%= yeoman.src %>/templates/pages/index.hbs']
				}
			},
			courtesy_page: {
				options: {
					layout: 'courtesy.hbs'
				},
				files: {
					'<%= yeoman.src %>/': ['<%= yeoman.src %>/templates/courtesy_page/*.hbs']
				}
			}
		},
		useminPrepare: {
			options: {
				dest: '<%= yeoman.build %>'
			},
			html: ['<%= yeoman.src %>/*.html']
		},
		usemin: {
			options: {
				assetsDirs: ['<%= yeoman.build %>','<%= yeoman.build %>/images']
			},
			html: ['<%= yeoman.build %>/{,*/}*.html'],
			css: ['<%= yeoman.build %>/css/{,*/}*.css', '!<%= yeoman.build %>/css/login_reg.css']
		},
		imagemin: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.src %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.build %>/images'
				}]
			}
		},
		cssmin: {
			// This task is pre-configured if you do not wish to use Usemin
			// blocks for your CSS. By default, the Usemin block from your
			// `index.html` will take care of minification, e.g.

			//     <!-- build:css({.tmp,src}) css/styles.css -->

			build: {
				files: {
					'<%= yeoman.build %>/css/styles.css': [
						'.tmp/css/{,*/}*.css'
					]
				}
			}
		},
		htmlmin: {
			build: {
				options: {
					// removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					// collapseWhitespace: true,
					// collapseBooleanAttributes: true,
					// removeAttributeQuotes: true,
					// removeRedundantAttributes: true,
					// useShortDoctype: true,
					// removeEmptyAttributes: true,
					// removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.src %>',
					src: '*.html',
					dest: '<%= yeoman.build %>'
				}]
			}
		},
		// Put files not handled in other tasks here
		copy: {
			build: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.src %>',
					dest: '<%= yeoman.build %>',
					src: [
						'*.html',
						'*.{ico,png,txt}',
						'.htaccess',
						'images/!(svg-src)/**',
						'css/fonts/*',
						'js/*.js',
						'video/*.{mp4,swf}'
					]
				}]
			}
		},
		concurrent: {
			server: [
				'compass'
			],
			build: [
				'sass',
				'compass',
				'htmlmin',
				'cssmin',
				'usemin'
			]
		},
		postcss: {
			options: {
				processors: [
					require('autoprefixer-core')({browsers: 'last 2 versions'})
				]
			},
			build: {
				src: '.tmp/css/styles.css',
				dest: '<%= yeoman.build %>/css/styles.css'
			}
		}
	});

	grunt.loadNpmTasks('assemble');

	grunt.registerTask('server', function (target) {
		if (target === 'build') {
			return grunt.task.run(['build', 'open', 'connect:build:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'concurrent:server',
			'connect:livereload',
			'open',
			'watch'
		]);
	});

	grunt.registerTask('build', [
		'sass',
		/*'useminPrepare',*/
		'clean:build',
		'assemble',
		'concurrent:build',
		'concat',
		'copy:build',
		'cssmin',
		'postcss',
		'uglify',
		'usemin'/*,
		'rev'*/
	]);

	grunt.registerTask('default', [
		'build'
	]);
};
