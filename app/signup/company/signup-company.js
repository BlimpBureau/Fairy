"use strict";

angular.module("signup.company", [])

.controller("SignupCompanyController", ["$scope", "$location", function($scope, $location) {
    $scope.state = "state-signup-company";

    //TODO: Remove. Used for testing animation only.
    $scope.goToUserSignup = function() {
        $location.path("/signup-user");
    };
}]);