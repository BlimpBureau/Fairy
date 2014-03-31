'use strict';

angular.module('fairyApp')
  .directive('newPriceItem', function () {
    return {
      templateUrl: 'views/newpriceitem.html',
      restrict: 'E',
      scope: {
      	partners: '='
      },
      link: function postLink(scope, element, attrs) {
        function vatOfPrice(price, vatRate, priceInclusiveVat) {
          if(priceInclusiveVat) {
            return price - price/(1 + vatRate);
          }

          return price * vatRate;
        }

        scope.updateVat = function() {
          var price = scope.newItem.price;
          var vatRate = scope.newItem.vatRate;
          var priceInclusiveVat = scope.newItem.priceInclusiveVat;

          if(price && vatRate) {
            scope.newItem.vat = vatOfPrice(price, vatRate, priceInclusiveVat);
          }
        };
      }
    };
  });
