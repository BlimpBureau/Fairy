"use strict";

/**
 * Validates a ng-model to conform to the vat rate format in a form.
 * Will set the $invalid variable to false if the input isn"t a percentage between 0 and 100.
 */
angular.module("vat.validRate", [])

.directive("validVatRate", function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, controller) {
            var VAT_RATE_REGEXP = /^0(.|,)\d+$/;

            //Add an additional parser to validate that the vat rate is valid.
            //Push it so it runs last.
            controller.$parsers.push(function(viewValue) {
                if(viewValue) {
                    if(VAT_RATE_REGEXP.test(viewValue)) {
                        controller.$setValidity("vatRate", true);

                        //Make sure any comma is converted to a dot.
                        return parseFloat(viewValue.replace(",", "."));
                    } else {
                        controller.$setValidity("vatRate", false);
                        return undefined;
                    }
                }
            });

            controller.$formatters.unshift(function(modelValue) {
                if(modelValue) {
                    var number = parseFloat(modelValue);

                    if(number > 0 && number < 1) {
                        controller.$setValidity("vatRate", true);
                        return String(number);
                    } else {
                        controller.$setValidity("vatRate", false);
                        return undefined;
                    }
                }
            });
        }
    };
});
