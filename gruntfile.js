module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			gruntfile: {
				files: ['gruntfile.js', 'package.json'],
				tasks: 'default'
			},
			scripts: {
				files: 'src/js/*.js',
				tasks: 'default'
			}
		},
		concat: {
			dist: {
				src: 'src/js/*.js',
				dest: 'build/js/global.min.js'
			}
		},
		uglify: {
      		options: {
        		banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        		mangle: true
      		},
			user_files: {
				files: [{
					expand: true,
					cwd: 'build/js',
					src: '**/*.js',
					dest: 'build/js'					
				}]
			},
			vendor_files: {
				files: [{
					expand: true,
					cwd: 'src/js/vendor',
					src: '**/*.js',
					dest: 'build/js'	
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [ 'concat', 'uglify', 'watch']);
};