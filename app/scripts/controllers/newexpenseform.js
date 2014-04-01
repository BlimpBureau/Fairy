'use strict';

angular.module('fairyApp').controller('NewExpenseFormCtrl', ['$scope', function($scope) {
  $scope.partners = [{
    fullname: 'Lucas Wiener'
  },
  {
    fullname: 'Nadan Gergeo'
  }];

  $scope.submit = function(valid) {
    console.log('submitted', valid);
  };
}]);