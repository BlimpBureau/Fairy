'use strict';

var app = angular.module('fairyApp').controller('NewExpenseFormCtrl', ['$scope', function($scope) {
  $scope.partners = [{
    fullname: 'Lucas Wiener'
  },
  {
    fullname: 'Nadan Gergeo'
  }];

  $scope.expense = {
  	owners: []
  };

  $scope.submit = function(valid) {
    console.log('submitted', valid);
  };
}]);