/* global bookie */

"use strict";

angular.module("verification.create", [
    "form.goodBad",
    "form.goodBadSubmit",
    "form.valid.date",
    "bookie.book",
    "bookie.filters",
    "financial.money",
    "presentation.accountSelection"
])

.controller("CreateVerificationController", ["$scope", "book", function($scope, book) {
    $scope.verification = new bookie.Verification(book);

    $scope.userTriedSubmit = false;

    $scope.book = book;
    $scope.transactions = [];
    $scope.balanced = true;

    $scope.handleBadSubmit = function() {
        $scope.userTriedSubmit = true;
    };

    $scope.createVerification = function(callback) {
        $scope.error = true; //not implemented.
        if(!$scope.error) {
            return callback();
        }
    };

    $scope.addTransaction = function() {
        $scope.transactions.push({
            account: book.getAccounts()[0].number,
            credit: 0,
            debit: 0
        });
    };

    $scope.remove = function(index) {
        $scope.transactions.splice(index, 1);
    };

    $scope.addTransaction();

    $scope.$watch("transactions", function(newValue) {
        function sum(type) {
            return _.reduce(_.pluck(newValue, type), function(amount, sum) {
                return amount + sum;
            }, 0);
        }

        $scope.balanced = bookie.isAmountsEqual(sum("credit"), sum("debit"));
    }, true);
}])

.directive("createVerification", function() {
    return {
        restrict: "E",
        templateUrl: "ledger/create-verification/create-verification.html"
    };
})

;
