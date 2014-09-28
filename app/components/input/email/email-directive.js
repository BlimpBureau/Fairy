"use strict";

angular.module("input.email", [])

.directive("email", function() {
    return {
        require: "ngModel",
        link: function(scope, element, attr, controller) {
            //TODO: Really shitty email regexp for now.
            var EMAIL_REGEXP = /^.+@.+\..*$/;

            controller.$parsers.push(function(viewValue) {
                if(viewValue) {
                    viewValue = viewValue.trim();

                    if(EMAIL_REGEXP.test(viewValue)) {
                        controller.$setValidity("email", true);
                        return viewValue;
                    } else {
                        controller.$setValidity("email", false);
                    }
                }
            });
        }
    };
});
