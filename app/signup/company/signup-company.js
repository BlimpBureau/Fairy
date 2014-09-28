"use strict";

angular.module("signup.company", [
    "form.goodBad",
    "input.company-name",
    "input.company-org-number"
])

.controller("SignupCompanyController", ["$scope", "$location", function($scope, $location) {
    $scope.state = "state-signup-company";

    //TODO: Remove. Used for testing animation only.
    $scope.goToUserSignup = function() {
        $location.path("/signup-user");
    };
}]);