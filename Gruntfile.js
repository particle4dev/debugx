module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    ui: 'tdd'
                },
                src: ['test/**/*.js']
            }
        },

        watch: {
            test: {
                files: 'test/**/*.js',
                tasks: ['mochaTest', 'jshint']
            },
            src: {
                files: 'src/**/*.js',
                tasks: ['mochaTest', 'jshint']
            }
        },

        jshint: {
            all: ['src/**/*.js', 'test/**/*.js']
        },

        browserify: {
            js: {
                src: 'src/debugx.js',
                dest: 'dist/debugx.browser.js'
            }
        },

        minified: {
            files: {
                src: [
                    'dist/debugx.browser.js',
                    'src/debugx.js'
                ],
                dest: 'dist/'
            },
            options : {
                sourcemap: true,
                allinone: false
            }
        }
    });

    // Add the grunt-mocha-test tasks.
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-minified');
    grunt.loadNpmTasks('grunt-release');

    grunt.registerTask('build', ['browserify', 'minified']);
    grunt.registerTask('default', ['mochaTest', 'watch']);
}