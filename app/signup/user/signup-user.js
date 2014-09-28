"use strict";

angular.module("signup.user", [
	"form.goodBad",
	"form.goodBadSubmit",
	"input.person-name",
	"input.email",
	"input.password",
	"resources.user"
])

.controller("SignupUserController", ["$rootScope", "$scope", "$location", "User", function($rootScope, $scope, $location, User) {
    $scope.state = "state-signup-user";

    $scope.userTriedSubmit = false;

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
            console.log(user, responseHeaders);
            goToSignupCompany();
        }, function(error) {
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