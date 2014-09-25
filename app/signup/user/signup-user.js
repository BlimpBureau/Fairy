"use strict";

angular.module("signup.user", [])

.controller("SignupUserController", ["$rootScope", "$scope", "$location", function($rootScope, $scope, $location) {
    $scope.state = "state-signup-user";

    $scope.goToSignupCompany = function() {
        // $rootScope.transition = "slide-left";
        $location.path("/signup-company");
    };
}]);