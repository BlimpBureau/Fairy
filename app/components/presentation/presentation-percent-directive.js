'use strict';

angular.module('presentation.percent', [])

.directive('percent', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      max: '=?percentMax',
      min: '=?percentMin'
    },
    link: function(scope, element, attr, modelController) {
      var PERCENT_REGEXP = /^\d*((.|,)\+)?$/;

      function validRange(value) {
        var min = angular.isDefined(scope.min) ? value >= scope.min : true;
        var max = angular.isDefined(scope.max) ? value <= scope.max : true;
        return min && max;
      }

      modelController.$parsers.push(function(viewValue) {
        if(viewValue) {
          if(PERCENT_REGEXP.test(viewValue)) {
            //Make sure any comma is converted to a dot.
            var value = parseFloat(viewValue.replace(',', '.'));

            if(validRange(value)) {
              modelController.$setValidity('percent', true);
              return value;
            }
          }

          modelController.$setValidity('percent', false);
        }
      });

      modelController.$formatters.unshift(function(modelValue) {
        if(modelValue) {
          var value = parseFloat(modelValue);

          if(validRange(value)) {
            modelController.$setValidity('percent', true);
            return String(value);
          }

          modelController.$setValidity('percent', false);
        }
      });
    }
  };
});
