'use strict';

angular.module('financial.money', [])

.directive('money', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, controller) {
      var NUM_DECIMALS = 2;

      controller.$formatters.unshift(function(modelValue) {
        var number = parseFloat(modelValue);
        if(number) {
          var rounded = +number.toFixed(2);
          return String(rounded).replace(',', '.');
        }
      });
    }
  };
});
