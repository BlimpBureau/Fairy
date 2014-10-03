/* global bookie */

"use strict";

angular.module("verification.create", [
    "form.goodBad",
    "form.goodBadSubmit",
    "input.date",
    "input.money",
    "bookie.book",
    "bookie.filters",
    "presentation.accountSelection"
])

.controller("CreateVerificationController", ["$scope", "book", function($scope, book) {
    function initScope() {
        $scope.userTriedSubmit = false;
        $scope.book = book;
        $scope.balanced = true;
        $scope.emptyTransaction = false;

        $scope.transactions = [];
        $scope.description = "";
        $scope.date = "";
    }

    $scope.handleBadSubmit = function() {
        $scope.userTriedSubmit = true;
    };

    $scope.createVerification = function(callback) {
        function transact(verification, transaction, type) {
            if(transaction[type]) {
                verification[type](transaction.account, transaction[type]);
            }
        }

        function validTransactions() {
            //If the transactions are unbalanced, ignore the submit. Error message will be shown by view.
            if(!$scope.balanced) {
                return false;
            }

            //No transaction is allowed to have both debit and credit set to 0.
            if($scope.emptyTransaction) {
                return false;
            }

            //Everything seems to be good.
            return true;
        }

        //Check for invalid transaction input. If errors encountered, the view will show error based on scope variables that
        //are set by the function. Submit function should just exit early.
        if(!validTransactions()) {
            return;
        }

        var verification = book.createVerification($scope.date, $scope.description);

        _.forEach($scope.transactions, function(transaction) {
            transact(verification, transaction, "credit");
            transact(verification, transaction, "debit");
        });

        if(!$scope.error) {
            resetForm();
            return (callback || _.noop)();
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

    function resetForm() {
        initScope();
        $scope.addTransaction();
        $scope.createVerificationForm.$setPristine();
    }

    initScope();
    $scope.addTransaction();

    $scope.$watch("transactions", function(newValue) {
        function sum(type) {
            return _.reduce(_.pluck(newValue, type), function(amount, sum) {
                return amount + sum;
            }, 0);
        }

        $scope.balanced = bookie.isAmountsEqual(sum("credit"), sum("debit"));

        $scope.emptyTransaction = false;
        _.forEach($scope.transactions, function(transaction) {
            if(transaction.credit === 0 && transaction.debit === 0) {
                $scope.emptyTransaction = true;
                return false;
            }
        });
    }, true);
}])

.directive("createVerification", function() {
    return {
        restrict: "E",
        templateUrl: "routes/ledger/create-verification/create-verification.html"
    };
})

;
