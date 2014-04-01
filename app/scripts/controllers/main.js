'use strict';

var app = angular.module('fairyApp');

app.controller('MainCtrl', ['$scope', '$firebase', function ($scope, $firebase) {
  $scope.doneLoading = function() {
    console.log('bajskorv');
    $('table.responsive').table();
    $('#expenses').show();
    $('#incomes').show();
  };

  var ref = new Firebase('https://scorching-fire-7581.firebaseIO.com/');
  ref.child('partners').once('value', function(partnersSnap) {
    $scope.partners = $firebase(partnersSnap.ref());
    ref.child('vouchers').once('value', function(vouchersSnap) {
        $scope.vouchers = $firebase(vouchersSnap.ref());
        $scope.doneLoading();
      });
  });

  $scope.openAddExpenseModal = function() {
    $('#add-expense-modal').modal('show');
  };

  $scope.vatOfPrice = function(price, vatRate, priceInclusiveVat) {
    if(priceInclusiveVat) {
      return price - price/(1 + vatRate);
    }

    return price * vatRate;
  }
}]);