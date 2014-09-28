"use strict";

angular.module("input.company-org-number", [])

.directive("companyOrgNumber", function() {
    return {
        require: "ngModel",
        link: function(scope, element, attr, controller) {
            var COMPANY_ORG_NUMBER_REGEXP = /^\d{10}\d?\d?\d?$/;

            controller.$parsers.push(function(viewValue) {
                if(viewValue) {
                    viewValue = viewValue.replace(/\s/i, "");
                    viewValue = viewValue.replace(/-/i, "");
                    viewValue = viewValue.replace(/\+/i, "");

                    if(COMPANY_ORG_NUMBER_REGEXP.test(viewValue)) {
                        controller.$setValidity("company-org-number", true);
                        return viewValue;
                    } else {
                        controller.$setValidity("company-org-number", false);
                    }
                }
            });
        }
    };
});
