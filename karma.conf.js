/* global module */

"use strict";

module.exports = function(config) {
    config.set({
        basePath: "./",
        files: [
            "bower_components/angular/angular.js",
            "bower_components/angular-mocks/angular-mocks.js",
            "bower_components/jquery/dist/jquery.min.js",
            "bower_components/bootstrap/dist/js/bootstrap.min.js",
            "bower_components/angular-route/angular-route.min.js",
            "bower_components/lodash/dist/lodash.min.js",
            "bower_components/bookie/dist/bookie.js",
            "bower_components/bookie/dist/bookie-swedish-hb-ef.js",
            "app/**/*.js"
        ],
        autoWatch: false,
        singleRun: true,
        frameworks: ["jasmine"],
        browsers: ["Chrome"],
        plugins: ["karma-chrome-launcher", "karma-jasmine"]
    });
};
