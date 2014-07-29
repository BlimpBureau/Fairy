"use strict";

angular.module("ledger", [
    "bookie.filters",
    "bookie.book",
    "presentation.moneyFilter",
    "presentation.dateFilter"
])

.controller("LedgerController", ["$scope", "book", function($scope, book) {
    $scope.book = book;
}]);
