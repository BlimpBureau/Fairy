"use strict";

angular.module("signup.user", [
    "form.goodBad",
    "form.goodBadSubmit",
    "input.person-name",
    "input.email",
    "input.password",
    "resources.user",
    "misc.login"
])

.controller("SignupUserController", ["$rootScope", "$scope", "$location", "userService", "loginService", function($rootScope, $scope, $location, userService, loginService) {
    $scope.state = "state-signup-user";

    $scope.userTriedSubmit = false;
    $scope.errorServer = false;
    $scope.errorEmailExists = false;

    $scope.signupUser = function() {
        var firstName = $scope.name.firstName;
        var lastName = $scope.name.lastName;
        var email = $scope.email;
        var password = $scope.password;

        userService.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }).then(function(user) {
            loginService.loginByEmailAndPassword(user.email, password).then(function(data) {
                var user = data.user;
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
    }
}]);
