'use strict';

angular.module('vat.calculator', [])
  .factory('vatCalculator', function() {
    return {
      vatOfPrice: function(price, vatRate, priceIncludingVat) {
        if(priceIncludingVat) {
          return price - (price / (1 + vatRate));
        } else {
          return price * vatRate;
        }
      }
    };
  });
