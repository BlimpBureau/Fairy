/* global module, require */

'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    includeSource: {
      options: {
        basePath: 'app'
      },
      build: {
        files: {
          'build/app/index.html': 'app/index.html'
        }
      }
    },
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: 'app',
          dest: 'build/app',
          src: [
            '**/*.*',
            '!*_test.js',
            '!index.html'
          ]
        }, {
          expand: false,
          dest: 'build/',
          src: 'bower_components/**/*'
        }, {
          expand: false,
          dest: 'build/',
          src: 'assets/**/*'
        }]
      }
    }
  });

  grunt.registerTask('build', [
    'includeSource:build',
    'copy:build'
  ]);
};
