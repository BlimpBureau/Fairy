'use strict';

function vatOfPrice(price, vatRate, priceInclusiveVat) {
  if(priceInclusiveVat) {
    return price - price/(1 + vatRate);
  }

  return price * vatRate;
}

angular.module('fairyApp')
  .directive('newExpense', function () {
    return {
      templateUrl: 'views/new-expense.html',
      restrict: 'E',
      scope: {
      	partners: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.expense = {
          owners: []
        };

        scope.updateVat = function() {
          var price = scope.expense.price;
          var vatRate = scope.expense.vatRate;
          var priceInclusiveVat = scope.expense.priceInclusiveVat;

          if(price && vatRate) {
            scope.expense.vat = vatOfPrice(price, vatRate, priceInclusiveVat);
          }
        };

        scope.ownersChanged = function() {
          var numOwners = 0;

          scope.expense.owners.forEach(function(owner) {
            if(owner.share > 0) {
              numOwners++;
            }
          });

          console.log(numOwners);

          scope.ownerShare = 1 / numOwners;
        };
      }
    };
  });
