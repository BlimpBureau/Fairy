"use strict";

angular.module("sidenav", [])

.directive("sidenav", function() {
    return {
        scope: true,
        restrict: "E",
        templateUrl: "sidenav/sidenav.html",
        link: function(scope, element, attr, controller) {

        }
    };
});
