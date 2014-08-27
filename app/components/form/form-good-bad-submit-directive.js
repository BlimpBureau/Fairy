"use strict";

angular.module("form.goodBadSubmit", [])

.directive("goodBadSubmit", ["$parse", function($parse) {
    return {
        restrict: "EA",
        require: "^form",
        link: function(scope, element, attr, form) {
            var goodSubmitGetter = $parse(attr.goodSubmit);
            var badSubmitGetter = $parse(attr.badSubmit);
            var goodSubmit = goodSubmitGetter(scope);
            var badSubmit = badSubmitGetter(scope);

            scope.submit = function() {
                if(form.$valid) {
                    goodSubmit.apply(this, arguments);
                } else {
                    badSubmit.apply(this, arguments);
                }
            };
        }
    };
}]);
