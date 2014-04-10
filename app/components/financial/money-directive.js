'use strict';

angular.module('financial.money', [])

.directive('money', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, controller) {
      var attrDecimals = parseInt(attr.decimals);

      var NUM_DECIMALS = isNaN(attrDecimals) ? 2 : attrDecimals;

      controller.$formatters.unshift(function(modelValue) {
        var number = parseFloat(modelValue);
        if(number) {
          var rounded = +number.toFixed(NUM_DECIMALS);
          return String(rounded).replace(',', '.');
        }
      });
    }
  };
});
