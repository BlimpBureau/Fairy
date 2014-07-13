"use strict";

angular.module("form.goodBad", [])

.directive("goodBadForm", ["$parse", function($parse) {
    return {
        restrict: "EA",
        require: "^form",
        link: function(scope, element, attrs, form) {
            function ignoreDirty() {
                var ignoreDirtyGetter = $parse(attrs.goodBadForm);
                return ignoreDirtyGetter(scope);
            }

            scope.isBad = function(name) {
                var e = form[name];
                return e && e.$invalid && (e.$dirty || ignoreDirty());
            };

            scope.isGood = function(name) {
                var e = form[name];
                return e && e.$valid && e.$dirty;
            };
        }
    };
}]);
