"use strict";

angular.module("presentation.accountSelection", [
    "bookie.book",
    "misc.integer"
])

.directive("accountSelection", ["book", function(book) {
    return {
        scope: {
            account: "=ngModel"
        },
        restrict: "E",
        require: "ngModel",
        templateUrl: "components/presentation/account-selection/account-selection.html",
        link: function(scope, element, attr, controller) {
            var modelController = controller;

            scope.accounts = book.accounts;

            modelController.$parsers.push(function(viewValue) {
                return viewValue | 0;
            });
        }
    };
}])

;
