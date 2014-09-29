"use strict";

angular.module("resources.company", [
    "ngResource",
    "config",
    "misc.token-wrap-resource-actions"
])

.factory("Company", ["$resource", "tokenWrapResourceActions", "API_END_POINT", function($resource, tokenWrapResourceActions, API_END_POINT) {
    var Company = $resource(API_END_POINT + "/companies/:id", {
        id: "@id"
    });

    tokenWrapResourceActions.wrap(Company, ["save", "get"]);

    return Company;
}])

;
