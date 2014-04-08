'use strict';

var module = angular.module('expenses.create', [
  'vat.validRate',
  'vat.calculator'
]);

module.controller('createExpenseController', ['$scope', 'vatCalculator', function($scope, vatCalculator) {
  $scope.expense = {
    price: undefined,
    priceIncludesVat: false,
    vatRate: undefined,
    vat: undefined,
    owners: []
  };

  $scope.changedBy = {
    price: 'controller',
    vatRate: 'controller',
    vat: 'controller'
  };

  $scope.partners = [
    {
      fullname: 'Lucas Wiener'
    },
    {
      fullname: 'Nadan gergeo'
    }
  ];

  var CHANGED_BY_USER = 'user';
  var CHANGED_BY_CONTROLLER = 'controller';

  var changedBy = {
    price: CHANGED_BY_CONTROLLER,
    vatRate: CHANGED_BY_CONTROLLER,
    vat: CHANGED_BY_CONTROLLER
  };

  $scope.changed = function(input) {
    changedBy[input] = CHANGED_BY_USER;
  };

  function autofill(changed, newValue) {
    function canChange(element) {
      return !$scope.expense[element] || changedBy[element] === CHANGED_BY_CONTROLLER;
    }

    if(newValue) {
      var price = $scope.expense.price;
      var vatRate = $scope.expense.vatRate;
      var piv = $scope.expense.priceIncludesVat;
      var vat = $scope.expense.vat;

      if(changed !== 'vat' && vatRate && price && canChange('vat')) {
        //The changed model is not vat, there is a vatRate and a price and we can change the vat model.
        $scope.expense.vat = vatCalculator.vatOfPrice(price, vatRate, piv);
      } else if(changed !== 'vatRate' && vat && price && canChange('vatRate')) {
        //The changed model is not vatRate, there is a vat and a price and we can change the vatRate model.
        $scope.expense.vatRate = vatCalculator.vatRateOfPrice(price, vat, piv);
      } else if(changed !== 'price' && vatRate && vat && canChange('price')) {
        //The changed model is not price, there is a vatRate and a vat and we can change the price model.
        $scope.expense.price = vatCalculator.priceOfVat(vat, vatRate, piv);
      }
    }
  }

  function autofillWatch(element) {
    var model = 'expense.' + element;

    $scope.$watch(model, function(newValue, oldValue) {
      autofill(element, newValue);
    });
  }

  autofillWatch('price');
  autofillWatch('vatRate');
  autofillWatch('vat');

  $scope.$watch('expense.priceIncludesVat', function(newValue, oldValue) {
    //If something is able to be autofilled, it has already been autofilled by now,
    //which means one of the price, vatRate, vat can have been changed by controller.
    //Now that piv has been changed, the expense model is likely to be incorrect, so then
    //change the controller-changed value.

    var price = $scope.expense.price;
    var vatRate = $scope.expense.vatRate;
    var piv = $scope.expense.priceIncludesVat;
    var vat = $scope.expense.vat;

    if(price && vatRate && vat) {
      if(changedBy.price === CHANGED_BY_CONTROLLER) {
        $scope.expense.price = vatCalculator.priceOfVat(vat, vatRate, piv);
      } else if(changedBy.vatRate === CHANGED_BY_CONTROLLER) {
        $scope.expense.vatRate = vatCalculator.vatRateOfPrice(price, vat, piv);
      } else if(changedBy.vat === CHANGED_BY_CONTROLLER) {
        $scope.expense.vat = vatCalculator.vatOfPrice(price, vatRate, piv);
      }
    }
  });
}]);

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
