"use strict";

angular.module("resources.user", [
    "ngResource",
    "config",
    "misc.token-wrap-resource-actions"
])

.factory("User", ["$resource", "tokenWrapResourceActions", "API_END_POINT", function($resource, tokenWrapResourceActions, API_END_POINT) {
    var User = $resource(API_END_POINT + "/users/:id", {
        id: "@id"
    });

    User.prototype.hasCompanies = function() {
        return this.companies.length;
    };

    //Wrap methods to send access token.
    tokenWrapResourceActions.wrap(User, ["get"]);

    return User;
}])

;
