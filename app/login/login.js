"use strict";

angular.module("login", [
    "form.goodBad",
    "form.goodBadSubmit",
    "input.email",
    "input.password",
    "misc.user-session",
    "misc.authenticate",
    "resources.user"
])

.controller("LoginController", ["$scope", "$location", "userSession", "authenticate", "User", function($scope, $location, userSession, authenticate, User) {
    $scope.state = "state-login";

    $scope.userTriedSubmit = false;
    $scope.errorServer = false;
    $scope.errorInvalidCredentials = false;

    $scope.login = function() {
        authenticate.byEmailAndPassword($scope.email, $scope.password).then(function(authResult) {
            userSession.set(authResult.id, authResult.token, authResult.tokenExpires);

            User.get({ id: authResult.id }, function(user) {
                console.log("authenticated");

                var goTo = $location.search("goTo");
                $location.path("/" + goTo || "");
            }, errorHandler);
        }, function(error) {
            if(error.status === 401) {
                $scope.errorServer = false;
                $scope.errorInvalidCredentials = true;
                return;
            }

            errorHandler(error);
        });
    };

    $scope.handleBadSubmit = function() {
        $scope.userTriedSubmit = true;
    };


    function errorHandler(error) {
        console.error(error);
        $scope.errorServer = true;
    }
}]);
