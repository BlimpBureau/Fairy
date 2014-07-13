'use strict';

angular.module('ledger', [
  "bookie.filters",
  "bookie.book"
])

.controller('LedgerController', ["$scope", "book", function($scope, book) {
  $scope.book = book; 
}]);