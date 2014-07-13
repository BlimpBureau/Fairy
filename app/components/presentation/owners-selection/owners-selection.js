"use strict";

angular.module("presentation.owners-selection", [
    "resources.partners"
])

.directive("ownersSelection", ["partners", function(partners) {
    return {
        scope: {
            owners: "=ngModel"
        },
        restrict: "E",
        require: ["ngModel", "^form"],
        templateUrl: "components/presentation/owners-selection/owners-selection.html",
        link: function(scope, element, attrs, controllers) {
            var modelController = controllers[0];
            var formController = controllers[1];

            formController.$addControl(modelController);

            modelController.$parsers.push(function(viewValue) {
                if(!viewValue || !viewValue.length) {
                    modelController.$setValidity("owners", false);
                    return;
                } else {
                    modelController.$setValidity("owners", true);
                    return viewValue;
                }
            });

            scope.partners = partners;
            scope.$watch("partners", function(newValue, oldValue) {
                if(newValue === oldValue) {
                    return;
                }

                modelController.$setViewValue(_.pluck(_.filter(newValue, "selected"), "fullname"));
            }, true);

            scope.$on("destroy", function() {
                formController.$removeControl(modelController);
            });
        }
    };
}]);
