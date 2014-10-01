"use strict";

angular.module("signup.company", [
    "form.goodBad",
    "form.goodBadSubmit",
    "input.company-name",
    "input.company-org-number",
    "resources.company",
    "resources.user",
    "misc.session"
])

.controller("SignupCompanyController", ["$scope", "$location", "companyService", "userService", "session", function($scope, $location, companyService, userService, session) {
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
        }, function(company) {
            userService.get(); //Refresh user since the companies array must have been changed.
            $location.path("/");
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
