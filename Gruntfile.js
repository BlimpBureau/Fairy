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
                        "!*_test.js",
                        "!index.html"
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
        connect: {
            options: {
                port: 8888,
                hostname: "localhost",
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
        }
    });

    grunt.registerTask("build", [
        "clean:build",
        "includeSource:build",
        "copy:build"
    ]);

    grunt.registerTask("serve", [
        "build",
        "connect:build",
        "watch"
    ]);
};
