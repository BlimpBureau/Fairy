"use strict";

angular.module("input.person-name", [])

.directive("personName", function() {
	return {
		require: "ngModel",
		link: function(scope, element, attr, controller) {
			//TODO: Really shitty name regex for now.
			var FULL_NAME_REGEXP = /^.+ .+$/;

			controller.$parsers.push(function(viewValue) {
				if(viewValue) {
					viewValue = viewValue.trim();

					if(FULL_NAME_REGEXP.test(viewValue)) {
						controller.$setValidity("person-name", true);
						return splitFullName(viewValue);
					} else {
						controller.$setValidity("person-name", false);
						return false;
					}
				}
			});

			controller.$formatters.unshift(function(modelValue) {
				if(modelValue) {
					return combineToFullName(modelValue);
				}
			});
		}
	};
});

function combineToFullName(firstName, lastName) {
	return firstName + " " + lastName;
}

function splitFullName(fullName) {
	var components = fullName.split(" ");
	var lastName = components.splice(components.length - 1, components.length)[0];
	var firstName = components.join(" ");

	return {
		firstName: firstName,
		lastName: lastName
	};
}
