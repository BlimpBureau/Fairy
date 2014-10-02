"use strict";

angular.module("login", [
    "form.goodBad",
    "form.goodBadSubmit",
    "input.email",
    "input.password",
    "misc.login"
])

.controller("LoginController", ["$scope", "$location", "loginService", function($scope, $location, loginService) {
    $scope.state = "state-login";

    $scope.userTriedSubmit = false;
    $scope.errorServer = false;
    $scope.errorInvalidCredentials = false;

    $scope.login = function() {
        loginService.loginByEmailAndPassword($scope.email, $scope.password, $scope.rememberMe).then(function(data) {
            var user = data.user;
            var company = data.company;
            var goTo = $location.search().goTo || "";

            if(goTo === "logout") {
                //This doesnt make any sense.
                goTo = "";
            }

            if(!company) {
                goTo = "signup-company";
            }

            $location.path("/" + goTo).search({
                goTo: null
            });
        }, errorHandler);
    };

    $scope.handleBadSubmit = function() {
        $scope.userTriedSubmit = true;
    };

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
