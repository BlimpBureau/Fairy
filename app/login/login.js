"use strict";

angular.module("login", [])

.controller("LoginController", ["$scope", function($scope) {
    $scope.state = "state-login";
}]);