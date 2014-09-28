"use strict";

angular.module("signup.user", [
    "form.goodBad",
    "form.goodBadSubmit",
    "input.person-name",
    "input.email",
    "input.password",
    "resources.user",
    "misc.user-session",
    "misc.authenticate"
])

.controller("SignupUserController", ["$rootScope", "$scope", "$location", "User", "userSession", "authenticate", function($rootScope, $scope, $location, User, userSession, authenticate) {
    $scope.state = "state-signup-user";

    $scope.userTriedSubmit = false;
    $scope.errorServer = false;
    $scope.errorEmailExists = false;

    $scope.signupUser = function() {
        var firstName = $scope.name.firstName;
        var lastName = $scope.name.lastName;
        var email = $scope.email;
        var password = $scope.password;

        var user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;

        user.$save(function(user, responseHeaders) {
            authenticate.byEmailAndPassword(user.email, password).then(function(authResult) {
                debugger;
                userSession.set(user, authResult.token, authResult.tokenExpires);
                goToSignupCompany();
            }, function(error) {
                console.error(error);
                $scope.errorServer = true;
            });
        }, function(error) {
            if(error.status === 400) {
                if(error.data.error === "email_exists") {
                    $scope.errorEmailExists = true;
                    return;
                }
            }

            $scope.errorServer = true;
            console.error(error);
        });
    };

    $scope.handleBadSubmit = function() {
        $scope.userTriedSubmit = true;
    };

    function goToSignupCompany() {
        // $rootScope.transition = "slide-left";
        $location.path("/signup-company");
    };
}]);