"use strict";

angular.module("signup.user", [
	"input.person-name",
	"input.email",
	"input.password"
])

.controller("SignupUserController", ["$rootScope", "$scope", "$location", function($rootScope, $scope, $location) {
    $scope.state = "state-signup-user";

    $scope.goToSignupCompany = function() {
        // $rootScope.transition = "slide-left";
        $location.path("/signup-company");
    };
}]);