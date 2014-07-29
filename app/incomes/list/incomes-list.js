"use strict";

angular.module("incomes.list", [
    "resources.incomes",
    "resources.partners",
    "presentation.moneyFilter"
])

.controller("IncomesListController", ["$scope", "incomes", "partners", function($scope, incomes, partners) {
    $scope.incomes = incomes.get();
    $scope.partners = partners;
}]);
