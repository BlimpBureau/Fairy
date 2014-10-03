"use strict";

angular.module("fairyApp", [
    "ui.router",
    "ngAnimate",
    "menu",
    "sidenav",
    "dashboard",
    "ledger",
    "login",
    "logout",
    "signup",
    "misc.session"
])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    var routeBaseUrl = "routes/";

    function url(path) {
        return routeBaseUrl + path;
    }

    $urlRouterProvider.otherwise("/");
    $urlRouterProvider.when("/signup", "/signup-user");

    $stateProvider
    .state("dashboard", {
        url: "/",
        templateUrl: url("dashboard/dashboard.html"),
        controller: "DashboardController",
        requireAuthenticatedSession: true
    })
    .state("ledger", {
        url: "/ledger",
        templateUrl: url("ledger/ledger.html"),
        controller: "LedgerController",
        requireAuthenticatedSession: true
    })
    .state("login", {
        url: "/login", // /login/:goTo TODO: The :goTo breaks stuff.
        templateUrl: url("login/login.html"),
        controller: "LoginController",
        requireNoAuthenticatedSession: true,
        disableSidenav: true
    })
    .state("logout", {
        url: "/logout",
        controller: "LogoutController",
        disableSidenav: "inherit"
    })
    .state("signup", {
        url: "/signup",
        redirectTo: "/signup-user",
    })
    .state("signup-user", {
        url: "/signup-user",
        templateUrl: url("signup/user/signup-user.html"),
        controller: "SignupUserController",
        requireNoAuthenticatedSession: true,
        disableSidenav: true
    })
    .state("signup-company", {
        url: "/signup-company",
        templateUrl: url("signup/company/signup-company.html"),
        controller: "SignupCompanyController",
        requireAuthenticatedSession: true,
        disableSidenav: true
    });
}])

.run(["$rootScope", "$state", "session", function($rootScope, $state, session) {
    $rootScope.$on("$stateNotFound", function() {
        console.log("not found");
    });

    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){
        console.log(fromState.name + " -> " + toState.name);
    })

    if(session.isAuthenticated()) {

    }

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        var authenticated = session.isAuthenticated();

        transit("login", "signup-user", "slide-left");
        transit("signup-user", "login", "slide-right");

        function transit(from, to, transition) {
            if(fromState.name === from && toState.name === to) {
                $rootScope.transition = transition;
            }
        }

        if(toState.requireAuthenticatedSession) {
            if(!authenticated) {
                event.preventDefault();

                var REDIRECT_TO = "login";
                if(toState.url !== "/") {
                    $state.go(REDIRECT_TO, {
                        goTo: toState.name
                    });
                    return;
                }

                $state.go(REDIRECT_TO);
                return;
            }
        }

        if(toState.requireNoAuthenticatedSession) {
            if(authenticated) {
                event.preventDefault();
                $state.go("");
                return;
            }
        }

        if(toState.disableSidenav !== "inherit") {
            $rootScope.sidenav = toState.disableSidenav ? false : true;
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
