"use strict";

angular.module("misc.token-wrap-resource-actions", [
    "misc.session"
])

.service("tokenWrapResourceActions", ["session", function(session) {
    return {
        wrap: function(resource, actions) {
            _.forEach(actions, function(action) {
                wrapAction(resource, action);
            });
        }
    };

    function wrapAction(resource, action) {
        //Save original action with _ prefix.
        resource["_" + action] = resource[action];

        resource[action] = function(params, success, error) {
            if(angular.isFunction(params)) {
                error = success;
                success = error;
                params = {};
            }

            params = angular.extend({}, params || {}, {
                access_token: session.token
            });

            return resource["_" + action](params, success, error);
        };
    }
}]);
