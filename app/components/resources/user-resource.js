"use strict";

angular.module("resources.user", [
	"ngResource",
	"config"
])

.factory("User", ["$resource", "API_END_POINT", function($resource, API_END_POINT) {
	return $resource(API_END_POINT + "/users/:id", {
		id: "@id"
	});
}])

;
