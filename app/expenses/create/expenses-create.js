'use strict';

var module = angular.module('expenses.create', [
  'validators.vatRate'
]);

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

module.directive('vatRate', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, controller) {
      //Add an additional parser to validate that the vat rate is valid.
      //Push it so it runs last.
      controller.$parsers.push(function(viewValue) {
        if(viewValue) {

        }
      });
    }
  };
});
