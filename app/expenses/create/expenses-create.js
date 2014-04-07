'use strict';

var module = angular.module('expenses.create', []);

module.controller('createExpenseController', function($scope) {
  $scope.expense = {
    price: 0,
    priceIncludesVat: false,
    vatRate: 0,
    vat: 0,
    owners: []
  };

  $scope.partners = [
    {
      fullname: 'Lucas Wiener'
    },
    {
      fullname: 'Nadan gergeo'
    }
  ];
});

module.directive('createExpense', function() {
  return {
    restrict: 'E',
    templateUrl: 'expenses/create/expenses-create.html'
  };
});
