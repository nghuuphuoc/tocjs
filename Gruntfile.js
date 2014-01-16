module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        buildDir: 'dist',

        banner: [
            '/**',
            ' * TocJS v<%= pkg.version %> (<%= pkg.homepage %>)',
            ' *',
            ' * Generate a table of contents based on headings',
            ' *',
            ' * @author      http://twitter.com/nghuuphuoc',
            ' * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc',
            ' * @license     MIT',
            ' */\n\n'
        ].join('\n'),

        // See https://github.com/gruntjs/grunt-contrib-copy
        copy: {
            main: {
                files: [
                    { cwd: 'src/css', src: '**', dest: '<%= buildDir %>/css', expand: true, flatten: true, filter: 'isFile' },
                    { cwd: 'src/js', src: '**', dest: '<%= buildDir %>/js', expand: true, flatten: true, filter: 'isFile' }
                ]
            }
        },

        // https://github.com/gruntjs/grunt-contrib-cssmin
        cssmin: {
            minify: { expand: true, cwd: 'src/css/', src: ['*.css'], dest: '<%= buildDir %>/css/', ext: '.min.css' },
            add_banner: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    '<%= buildDir %>/css/toc.min.css': ['src/css/toc.css'],
                    '<%= buildDir %>/css/toc-scroll.min.css': ['src/css/toc-scroll.css']
                }
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            build: {
                src: ['src/js/toc.js'],
                dest: '<%= buildDir %>/js/toc.min.js'
            }
        }
    });

    grunt.registerTask('default', 'build');
    grunt.registerTask('build', ['copy', 'cssmin', 'uglify']);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};
