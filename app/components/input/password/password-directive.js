"use strict";

angular.module("input.password", [])

.directive("password", function() {
	return {
		require: "ngModel",
		link: function(scope, element, attr, controller) {
			//TODO: Really shitty password regexp for now.
			var PASSWORD_REGEXP = /^.{6}.*$/;

			controller.$parsers.push(function(viewValue) {
				if(viewValue) {
					viewValue = viewValue.trim();

					if(PASSWORD_REGEXP.test(viewValue)) {
						controller.$setValidity("password", true);
						return viewValue;
					} else {
						controller.$setValidity("password", false);
					}
				}
			});
		}
	};
});
