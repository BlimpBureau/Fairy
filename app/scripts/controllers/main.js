'use strict';

angular.module('fairyApp')
  .controller('MainCtrl', ['$scope', '$firebase', function ($scope, $firebase) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
      
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
  }
]);