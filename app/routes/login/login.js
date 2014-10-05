"use strict";

angular.module("login", [
    "form.goodBad",
    "form.goodBadSubmit",
    "input.email",
    "input.password",
    "misc.login",
    "ui.router"
])

.controller("LoginController", ["$scope", "$state", "$stateParams", "loginService", function($scope, $state, $stateParams, loginService) {
    $scope.state = "state-login";

    reset();

    $scope.login = function() {
        loginService.loginByEmailAndPassword($scope.email, $scope.password, $scope.rememberMe).then(function(data) {
            var company = data.company;
            var goTo = $stateParams.goTo;

            if(goTo === "logout") {
                //This doesnt make any sense.
                goTo = false;
            }

            if(!company) {
                goTo = "signup-company";
            }

            goTo = goTo || "dashboard";

            $state.go(goTo);
        }, errorHandler);
    };

    $scope.handleBadSubmit = function() {
        $scope.userTriedSubmit = true;
    };

    function reset() {
        $scope.errorServer = false;
        $scope.errorInvalidCredentials = false;
        $scope.userTriedSubmit = false;
    }

    //TODO: Make a better solution for this?
    $scope.$watch("email", reset);
    $scope.$watch("password", reset);

    function errorHandler(error) {
        if(error.status === 401) {
            $scope.errorServer = false;
            $scope.errorInvalidCredentials = true;
            return;
        }

        console.error(error);
        $scope.errorServer = true;
    }
}]);
