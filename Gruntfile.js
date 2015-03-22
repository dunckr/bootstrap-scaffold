'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('assemble');

    grunt.initConfig({
        assemble: {
            options: {
                flatten: true,
                layoutdir: 'templates/layouts',
                partials: 'templates/partials/*.hbs',
                helpers: 'templates/helpers/*.js',
            },
            content: {
                options: {
                    data: 'templates/data/*.json'
                },
                src: ['contents/**/*.html'],
                dest: 'public/'
            }
        },
        watch: {
            scripts: {
                files: ['contents/**', 'templates/**'],
                tasks: ['sass', 'assemble', 'copy'],
            },
        },
        connect: {
            options: {
                port: 9000,
                base: './public/',
                livereload: true
            },
            livereload: {
                options: {
                    open: true,
                    base: './public/'
                }
            }
        },
        sass: {
            dist: {
                options: {},
                files: {
                    'public/css/main.css': 'contents/scss/main.scss'
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'contents/',
                    src: ['**/*.js', '**/*.css', '**/*.png'],
                    dest: 'public/'
                }, ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'contents/',
                    src: ['*.ico'],
                    dest: 'public/'
                }, ]
            }
        },
        'gh-pages': {
            options: {
                base: 'public'
            },
            src: ['**']
        },
        clean: ['public']
    });

    grunt.registerTask('default', ['sass', 'assemble', 'copy', 'connect', 'watch']);
    grunt.registerTask('build', ['clean', 'assemble', 'copy', 'sass']);
};
