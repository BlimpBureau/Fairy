"use strict";

angular.module("fairyApp", [
    "ngRoute",
    "ngAnimate",
    "menu",
    "dashboard",
    "ledger",
    "login",
    "signup",
    "misc.session"
])

.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when("/dashboard", {
        templateUrl: "dashboard/dashboard.html",
        controller: "DashboardController",
        requireAuthenticatedSession: true
    })
    .when("/ledger", {
        templateUrl: "ledger/ledger.html",
        controller: "LedgerController",
        requireAuthenticatedSession: true
    })
    .when("/login", {
        templateUrl: "login/login.html",
        controller: "LoginController"
    })
    .when("/signup", {
        redirectTo: "/signup-user"
    })
    .when("/signup-user", {
        templateUrl: "signup/user/signup-user.html",
        controller: "SignupUserController"
    })
    .when("/signup-company", {
        templateUrl: "signup/company/signup-company.html",
        controller: "SignupCompanyController",
        requireAuthenticatedSession: true
    })
    .otherwise({
        redirectTo: "/dashboard",
        requireAuthenticatedSession: true
    })
    ;
}])

.run(["$rootScope", "$location", "session", function($rootScope, $location, session) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if(next.requireAuthenticatedSession) {
            if(!session.isAuthenticated()) {
                var REDIRECT_TO = "/login";
                if(next.originalPath) {
                    var goTo = next.originalPath.replace("/", "");
                    $location.path(REDIRECT_TO).search({
                        goTo: goTo
                    });
                    return;
                }

                $location.path(REDIRECT_TO);
            }
        }
    });
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
