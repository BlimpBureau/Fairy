'use strict';

var module = angular.module('expenses.create', []);

module.controller('createExpenseController', function($scope) {
  $scope.expense = {
    price: undefined,
    priceIncludesVat: false,
    vatRate: undefined,
    vat: undefined,
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

module.directive('createExpenseForm', function() {
  return {
    scope: true,
    restrict: 'A',
    require: '^form',
    link: function(scope, element, attrs, form) {
      scope.isBad = function(name) {
        return form[name].$dirty && form[name].$invalid;
      };

      scope.isGood = function(name) {
        return form[name].$dirty && form[name].$valid;
      };
    }
  };
});
