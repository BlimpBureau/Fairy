'use strict';

angular.module('presentation.money-filter', [])

.filter('moneyFilter', function() {
  return function(input) {
    var NUM_DECIMALS = 2;
    var rounded = +parseFloat(input).toFixed(NUM_DECIMALS);
    return String(rounded).replace(',', '.');
  };
});
