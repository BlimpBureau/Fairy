"use strict";

angular.module("input.date", [])

.directive("date", function() {
    return {
        require: "ngModel",
        restrict: "A",
        link: function(scope, element, attr, modelController) {
            function modelFormat(date) {
                function zeroFix(index) {
                    if(parts[index].length === 1) {
                        parts[index] = "0" + parts[index];
                    }
                }

                var parts = date.split("-");

                zeroFix(1);
                zeroFix(2);

                return (new Date(parts.join("-"))).toISOString().slice(0, 10);
            }

            function isValidDate(date) {
                var DATE_REGEXP = /^(20)\d\d-\d\d?-\d\d?$/;
                return date && DATE_REGEXP.test(date) && !isNaN((new Date(date)).getTime());
            }

            modelController.$parsers.push(function(viewValue) {
                if(isValidDate(viewValue)) {
                    modelController.$setValidity("date", true);
                    return modelFormat(viewValue);
                }

                modelController.$setValidity("date", false);
            });

            modelController.$formatters.push(function(modelValue) {
                if(isValidDate(modelValue)) {
                    modelController.$setValidity("date", true);
                    return modelFormat(modelValue);
                }

                modelController.$setValidity("date", false);
            });
        }
    };
});
