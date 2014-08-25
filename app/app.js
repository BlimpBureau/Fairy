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
}])

//Workaround for bug #1404.
//This will allow ngModel and ngForm directives to have dynamic name attributes (expression evaluation in name).
//https://github.com/angular/angular.js/issues/1404
//Source: http://plnkr.co/edit/hSMzWC?p=preview
.config(["$provide", function($provide) {
    $provide.decorator("ngModelDirective", ["$delegate", function($delegate) {
        var ngModel = $delegate[0];
        var controller = ngModel.controller;
        ngModel.controller = ["$scope", "$element", "$attrs", "$injector", function(scope, element, attrs, $injector) {
            var $interpolate = $injector.get("$interpolate");
            attrs.$set("name", $interpolate(attrs.name || "")(scope));
            $injector.invoke(controller, this, {
                "$scope": scope,
                "$element": element,
                "$attrs": attrs
            });
        }];
        return $delegate;
    }]);
    $provide.decorator("formDirective", ["$delegate", function($delegate) {
        var form = $delegate[0];
        var controller = form.controller;
        form.controller = ["$scope", "$element", "$attrs", "$injector", function(scope, element, attrs, $injector) {
            var $interpolate = $injector.get("$interpolate");
            attrs.$set("name", $interpolate(attrs.name || attrs.ngForm || "")(scope));
            $injector.invoke(controller, this, {
                "$scope": scope,
                "$element": element,
                "$attrs": attrs
            });
        }];
        return $delegate;
    }]);
}])

;
