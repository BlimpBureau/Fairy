"use strict";

angular.module("login", [
    "form.goodBad",
    "form.goodBadSubmit",
    "input.email",
    "input.password",
    "misc.session",
    "misc.authenticate",
    "resources.user"
])

.controller("LoginController", ["$scope", "$location", "session", "authenticate", "User", function($scope, $location, session, authenticate, User) {
    $scope.state = "state-login";

    $scope.userTriedSubmit = false;
    $scope.errorServer = false;
    $scope.errorInvalidCredentials = false;

    $scope.login = function() {
        authenticate.byEmailAndPassword($scope.email, $scope.password).then(function(authResult) {
            session.set(authResult.id, authResult.token, authResult.tokenExpires);

            User.get({ id: authResult.id }, function(user) {
                session.data.user = user;

                if($scope.rememberMe) {
                    session.save();
                }

                var goTo = $location.search().goTo || "";

                if(!user.hasCompanies()) {
                    goTo = "signup-company";
                }

                $location.path("/" + goTo).search({
                    goTo: null
                });
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
