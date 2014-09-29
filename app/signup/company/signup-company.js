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

.controller("SignupCompanyController", ["$scope", "$location", "Company", "User", "session", function($scope, $location, Company, User, session) {
    $scope.state = "state-signup-company";

    $scope.userTriedSubmit = false;
    $scope.errorServer = false;

    $scope.signupCompany = function() {
        var name = $scope.name;
        var type = $scope.type;
        var orgNumber = $scope.orgNumber;

        var company = new Company();
        company.name = name;
        company.type = type;
        company.orgNumber = orgNumber;

        company.$save(function(company) {
            session.data.company = company;

            User.get({
                id: session.userId
            }, function(user) {
                session.data.user = user;
            }, errorHandler);

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
