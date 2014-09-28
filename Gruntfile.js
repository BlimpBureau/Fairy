/* global module, require */

"use strict";

module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        includeSource: {
            options: {
                basePath: "app"
            },
            build: {
                files: {
                    "build/app/index.html": "app/index.html"
                }
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: "app",
                    dest: "build/app",
                    src: [
                        "**/*.*",
                        "!**/*_test.js",
                        "!index.html",
                        "!**/*.less"
                    ]
                }, {
                    expand: false,
                    dest: "build/",
                    src: "bower_components/**/*"
                }, {
                    expand: false,
                    dest: "build/",
                    src: "assets/**/*"
                }]
            }
        },
        less: {
            build: {
                files: {
                    "build/app.css": "app/app.less"
                }
            }
        },
        connect: {
            options: {
                port: 8888,
                hostname: "0.0.0.0",
                livereload: false
            },
            build: {
                options: {
                    base: ["build", "build/app"],
                }
            }
        },
        watch: {
            options: {
                livereload: false
            },
            files: [
                "app/**/*",
                "!app/**/*_test.js",
                "bower.json"
            ],
            tasks: [
                "build"
            ]
        },
        clean: {
            build: {
                files: [{
                    src: "build"
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            all: ["Gruntfile.js", "app/**/*.js"]
        }
    });

    grunt.registerTask("default", [
        "test"
    ]);

    grunt.registerTask("test", [
        "jshint"
    ]);

    grunt.registerTask("build", [
        "clean:build",
        "less:build",
        "includeSource:build",
        "copy:build"
    ]);

    grunt.registerTask("serve", [
        "build",
        "connect:build",
        "watch"
    ]);
};
