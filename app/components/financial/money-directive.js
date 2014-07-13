"use strict";

angular.module("financial.money", [])

.directive("money", function() {
    return {
        require: "ngModel",
        link: function(scope, element, attr, controller) {
            var attrDecimals = parseInt(attr.decimals);

            var MONEY_REGEXP = /^\d+((.|,)\d+)?$/;

            var NUM_DECIMALS = isNaN(attrDecimals) ? 2 : attrDecimals;

            controller.$parsers.push(function(viewValue) {
                if(viewValue) {
                    if(MONEY_REGEXP.test(viewValue)) {
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
                var number = parseFloat(modelValue);
                if(number) {
                    var rounded = +number.toFixed(NUM_DECIMALS);
                    return String(rounded).replace(",", ".");
                }
            });
        }
    };
});
