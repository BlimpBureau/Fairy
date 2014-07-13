"use strict";

angular.module("menu", [])

.controller("MenuController", ["$scope", "$location", function($scope, $location) {
    $scope.menu = [{
        route: "/dashboard",
        name: "Dashboard"
    }, {
        route: "/expenses",
        name: "Expenses"
    }, {
        route: "/incomes",
        name: "Incomes"
    }, {
        route: "/ledger",
        name: "Ledger"
    }];

    $scope.isActive = function(route) {
        return $location.path() === route;
    };
}]);
