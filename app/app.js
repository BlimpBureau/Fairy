"use strict";

angular.module("fairyApp", [
    "ngRoute",
    "menu",
    "expenses",
    "incomes",
    "dashboard",
    "ledger"
])

.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when("/dashboard", {
        templateUrl: "dashboard/dashboard.html",
        controller: "DashboardController"
    })
    .when("/expenses", {
        templateUrl: "expenses/expenses.html",
        controller: "ExpensesController"
    })
    .when("/incomes", {
        templateUrl: "incomes/incomes.html",
        controller: "IncomesController"
    })
    .when("/ledger", {
        templateUrl: "ledger/ledger.html",
        controller: "LedgerController"
    })
    .otherwise({
        redirectTo: "/dashboard"
    })
    ;
}]);
