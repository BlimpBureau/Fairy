"use strict";

angular.module("ledger", [
    "bookie.filters",
    "bookie.book",
    "presentation.moneyFilter",
    "presentation.dateFilter"
])

.controller("LedgerController", ["$scope", "book", function($scope, book) {
    $scope.book = book;

    $scope.sumAccountTransactions = function(account, type) {
        if(type !== "credit" && type !== "debit") {
            throw new Error("Invalid type: " + type);
        }

        var sumFunction = type === "credit" ? account.sumCredit : account.sumDebit;

        return sumFunction.call(account);
    };
}]);
