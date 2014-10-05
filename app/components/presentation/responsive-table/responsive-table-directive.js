"use strict";

angular.module("presentation.responsive-table", [])

.directive("responsiveTable", ["$timeout", function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr, controller) {
            $timeout(function() {
                if(element.data('inited')) {
                    console.log("Table already initialized");
                    return;
                }

                console.log("Inited responsive table");

                element.data("inited", true);        
            });
        }
    };
}]);
