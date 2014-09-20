"use strict";

angular.module("fairyApp", [
    "ngRoute",
    "menu",
    "dashboard",
    "ledger",
    "login",
    "signup"
])

.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when("/dashboard", {
        templateUrl: "dashboard/dashboard.html",
        controller: "DashboardController"
    })
    .when("/ledger", {
        templateUrl: "ledger/ledger.html",
        controller: "LedgerController"
    })
    .when("/login", {
        templateUrl: "login/login.html",
        controller: "LoginController"
    })
    .when("/signup", {
        templateUrl: "signup/signup.html",
        controller: "SignupController"
    })
    .otherwise({
        redirectTo: "/dashboard"
    })
    ;
}])

.controller('MainController', ['$route', '$routeParams', '$location', function($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;

    //TODO: Very temporary!
    function getState(path) {
        return path.slice(1, path.length);
    }

    this.state = getState(this.$location.path());
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
