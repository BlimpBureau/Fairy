"use strict";

angular.module("resources.user", [
    "ngResource",
    "config",
    "misc.token-wrap-resource-actions",
    "misc.resource-handler"
])

.factory("userService", ["$rootScope", "$resource", "tokenWrapResourceActions", "ResourceHandler", "API_END_POINT", function($rootScope, $resource, tokenWrapResourceActions, ResourceHandler, API_END_POINT) {
    var User = $resource(API_END_POINT + "/users/:id", {
        id: "@id"
    });

    User.prototype.hasCompanies = function() {
        return this.companies.length;
    };

    //Wrap methods to send access token.
    tokenWrapResourceActions.wrap(User, ["get"]);

    return new ResourceHandler(User, {
        changed: "user:changed"
    });
}]);
