"use strict";

angular.module("expenses.list", [
    "resources.expenses",
    "presentation.moneyFilter"
])

.controller("ExpensesListController", ["$scope", "expenses", function($scope, expenses) {
    $scope.expenses = expenses.get();
}]);
