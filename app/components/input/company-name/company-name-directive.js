"use strict";

angular.module("input.company-name", [])

.directive("companyName", function() {
    return {
        require: "ngModel",
        link: function(scope, element, attr, controller) {
            var COMPANY_NAME_REGEXP = /^.+$/;

            controller.$parsers.push(function(viewValue) {
                if(viewValue) {
                    viewValue = viewValue.trim();

                    if(COMPANY_NAME_REGEXP.test(viewValue)) {
                        controller.$setValidity("company-name", true);
                        return viewValue;
                    } else {
                        controller.$setValidity("company-name", false);
                    }
                }
            });
        }
    };
});
