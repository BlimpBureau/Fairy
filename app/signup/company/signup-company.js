"use strict";

angular.module("signup.company", [
    "form.goodBad",
    "form.goodBadSubmit",
    "input.company-name",
    "input.company-org-number"
])

.controller("SignupCompanyController", ["$scope", "$location", function($scope, $location) {
    $scope.state = "state-signup-company";

    $scope.userTriedSubmit = false;
    $scope.errorServer = false;

    $scope.signupCompany = function() {

    };

    $scope.handleBadSubmit = function() {
        $scope.userTriedSubmit = true;
        console.log("bad submit");
    };
}]);
