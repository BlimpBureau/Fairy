"use strict";

angular.module("signup.company", [
    "form.goodBad",
    "form.goodBadSubmit",
    "input.company-name",
    "input.company-org-number",
    "resources.company",
    "resources.user",
    "ui.router"
])

.controller("SignupCompanyController", ["$scope", "$state", "companyService", "userService", function($scope, $state, companyService, userService) {
    $scope.state = "state-signup-company";

    $scope.userTriedSubmit = false;
    $scope.errorServer = false;

    $scope.signupCompany = function() {
        var name = $scope.name;
        var type = $scope.type;
        var orgNumber = $scope.orgNumber;

        companyService.create({
            name: name,
            type: type,
            orgNumber: orgNumber
        }).then(function() {
            userService.get(); //Refresh user since the companies array must have been changed.
            $state.go("dashboard");
        }, errorHandler);
    };

    $scope.handleBadSubmit = function() {
        $scope.userTriedSubmit = true;
        console.log("bad submit");
    };

    function errorHandler(error) {
        console.error(error);
        $scope.errorServer = true;
    }
}]);
