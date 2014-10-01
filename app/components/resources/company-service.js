"use strict";

angular.module("resources.company", [
    "ngResource",
    "config",
    "misc.token-wrap-resource-actions",
    "misc.resource-handler"
])

.factory("companyService", ["$resource", "tokenWrapResourceActions", "ResourceHandler", "API_END_POINT", function($resource, tokenWrapResourceActions, ResourceHandler, API_END_POINT) {
    var Company = $resource(API_END_POINT + "/companies/:id", {
        id: "@id"
    });

    tokenWrapResourceActions.wrap(Company, ["save", "get"]);

    return new ResourceHandler(Company);
}]);
