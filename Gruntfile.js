module.exports = function(grunt) {
	var autoprefixer = require('autoprefixer-core');
	grunt.initConfig({
		watch: {
			options: {
				livereload: false
			},
			dist: {
				files: [
					'sass/*.scss'
				],
				tasks: ['sass', 'postcss','cssmin','concat']
			}
		},
		postcss: {
			options: {
				processors: [
					autoprefixer({
						browsers: ['> 1%']
					}).postcss
				]
			},
			dist: {
				expand: true,
				cwd: 'css/css-debug',
				src: ['*.css'],
				dest: 'css/css/',
			}
		},
		sass: {
			dist: {
				expand: true,
				cwd: 'sass/',
				src: ['*.scss'],
				dest: 'css/css-debug/',
				ext: '.css'
			}

		},
		cssmin: {
            minify: {
                expand: true,
                cwd: 'css/css/',
                src: ['*.css'],       
                dest:'css/css-min/',
                ext: '.min.css'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['css/css-min/*.min.css'],
                dest: 'build/galaxy.min.css'
            },
            dist1: {
                src: ['css/css/*.css'],
                dest: 'build/galaxy.css'
            }
        }
        // copy:{
        // 	galaxy:{
        //         src: ['css/css/*.min.css'],       
        //         dest:'css/'
        // 	}
        // }
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.registerTask('default', ['sass', 'postcss','cssmin','concat']);
	grunt.registerTask('css', ['sass', 'postcss','cssmin','concat','watch']);
};