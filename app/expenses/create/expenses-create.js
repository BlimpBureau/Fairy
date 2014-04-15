'use strict';

angular.module('expenses.create', [
  'vat.validRate',
  'vat.calculator',
  'form.goodBad',
  'form.goodBadSubmit',
  'form.valid.date',
  'expenses.create.owners-selection',
  'expenses.create.payer-selection',
  'resources.expenses',
  'financial.money'
])

.controller('CreateExpenseController', ['$scope', 'vatCalculator', 'expenses', function($scope, vatCalculator, expenses) {
  $scope.expense = {
    price: undefined,
    priceIncludesVat: false,
    vatRate: undefined,
    vat: undefined,
    owners: undefined
  };

  $scope.userTriedSubmit = false;

  $scope.handleBadSubmit = function() {
    $scope.userTriedSubmit = true;
  };

  $scope.createExpense = function(callback) {
    $scope.error = expenses.add($scope.expense);
    if(!$scope.error) {
      return callback();
    }
  };

  var CHANGED_BY_USER = 'user';
  var CHANGED_BY_CONTROLLER = 'controller';

  $scope.changedBy = {
    price: CHANGED_BY_CONTROLLER,
    vatRate: CHANGED_BY_CONTROLLER,
    vat: CHANGED_BY_CONTROLLER
  };

  $scope.changed = function(input) {
    $scope.changedBy[input] = CHANGED_BY_USER;
  };

  function setValue(model, value) {
    $scope.expense[model] = value;
    $scope.changedBy[model] = CHANGED_BY_CONTROLLER;
  }

  function autofill(changed, newValue) {
    function canChange(element) {
      return $scope.expense[element] === undefined || $scope.changedBy[element] === CHANGED_BY_CONTROLLER;
    }

    if(newValue) {
      var price = $scope.expense.price;
      var vatRate = $scope.expense.vatRate;
      var piv = $scope.expense.priceIncludesVat;
      var vat = $scope.expense.vat;

      if(changed !== 'vat' && vatRate && price && canChange('vat')) {
        //The changed model is not vat, there is a vatRate and a price and we can change the vat model.
        setValue('vat', vatCalculator.vatOfPrice(price, vatRate, piv));
      } else if(changed !== 'vatRate' && vat && price && canChange('vatRate')) {
        //The changed model is not vatRate, there is a vat and a price and we can change the vatRate model.
        setValue('vatRate', vatCalculator.vatRateOfPrice(price, vat, piv));
      } else if(changed !== 'price' && vatRate && vat && canChange('price')) {
        //The changed model is not price, there is a vatRate and a vat and we can change the price model.
        setValue('price', vatCalculator.priceOfVat(vat, vatRate, piv));
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
      if($scope.changedBy.price === CHANGED_BY_CONTROLLER) {
        setValue('price', vatCalculator.priceOfVat(vat, vatRate, piv));
      } else if($scope.changedBy.vatRate === CHANGED_BY_CONTROLLER) {
        setValue('vatRate', vatCalculator.vatRateOfPrice(price, vat, piv));
      } else if($scope.changedBy.vat === CHANGED_BY_CONTROLLER) {
        setValue('vat', vatCalculator.vatOfPrice(price, vatRate, piv));
      }
    }
  });
}])

.directive('createExpense', function() {
  return {
    restrict: 'E',
    templateUrl: 'expenses/create/expenses-create.html',

  };
});
