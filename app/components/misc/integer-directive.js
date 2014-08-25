"use strict";

angular.module("misc.integer", [])

.directive("integer", function() {
    return {
        require: "ngModel",
        link: function(scope, element, attr, controller) {
            controller.$parsers.push(function(viewValue) {
                return parseInt(viewValue);
            });
        }
    };
})

;
