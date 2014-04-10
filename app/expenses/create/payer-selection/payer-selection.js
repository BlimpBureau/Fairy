'use strict';

angular.module('expenses.create.payer-selection', [
  'resources.partners',
  'resources.company'
])

.directive('payerSelection', ['partners', 'company', function(partners, company) {
  return {
    require: ['ngModel', '^form'],
    restrict: 'E',
    scope: {
      payer: '=ngModel'
    },
    templateUrl: 'expenses/create/payer-selection/payer-selection.html',
    link: function(scope, element, attrs, controllers) {
      var modelController = controllers[0];
      var formController = controllers[1];

      formController.$addControl(modelController);

      modelController.$parsers.push(function(viewValue) {
        if(!viewValue) {
          modelController.$setValidity('payer', false);
          return;
        } else {
          modelController.$setValidity('payer', true);
          return viewValue;
        }
      });

      scope.possiblePayers = [company].concat(partners);
      scope.selected = undefined;

      scope.$watch('selected', function(newValue, oldValue) {
        if(newValue === oldValue) {
          return;
        }

        modelController.$setViewValue(newValue.fullname);
      }, true);

      scope.$on('destroy', function() {
        formController.$removeControl(modelController);
      });
    }
  };
}]);
