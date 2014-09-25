"use strict";

angular.module("signup.user", [
	"form.goodBad",
	"form.goodBadSubmit",
	"input.person-name",
	"input.email",
	"input.password"
])

.controller("SignupUserController", ["$rootScope", "$scope", "$location", function($rootScope, $scope, $location) {
    $scope.state = "state-signup-user";

    $scope.userTriedSubmit = false;

    $scope.signupUser = function() {
    	var firstName = $scope.name.firstName;
    	var lastName = $scope.name.lastName;
    	var email = $scope.email;
    	var password = $scope.password;

    	goToSignupCompany();
    };

    $scope.handleBadSubmit = function() {
    	$scope.userTriedSubmit = true;
    };

    function goToSignupCompany() {
        // $rootScope.transition = "slide-left";
        $location.path("/signup-company");
    };
}]);