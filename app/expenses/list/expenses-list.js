"use strict";

angular.module("expenses.list", [
    "resources.expenses",
    "presentation.money-filter"
])

.controller("ExpensesListController", ["$scope", "expenses", function($scope, expenses) {
    $scope.expenses = expenses.get();
}]);
