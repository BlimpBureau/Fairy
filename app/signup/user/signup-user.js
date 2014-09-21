"use strict";

angular.module("signup.user", [])

.controller("SignupUserController", ["$scope", "$location", function($scope, $location) {
    $scope.state = "state-signup-user";

    $scope.goToSignupCompany = function() {
        $location.path("/signup-company");
    };
}]);