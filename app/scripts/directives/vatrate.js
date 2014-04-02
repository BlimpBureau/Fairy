'use strict';

//Has to be in the range 0 to 1. Acceps , and . as decimal delimeter.
var VAT_RATE_REGEXP = /^0(\,|\.)\d+$/;

angular.module('fairyApp')
  .directive('vatRate', function () {
    return {
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {
          if(VAT_RATE_REGEXP.test(viewValue)) {
            ctrl.$setValidity('vatRate', true);
            return parseFloat(viewValue.replace(',', '.'));
          } else {
            ctrl.$setValidity('vatRate', false);
            return undefined;
          }
        });
      }
    };
  });
