"use strict";

angular.module("logout", [
    "misc.session"
])

.factory("logoutService", ["$location", "session", function($location, session) {
    return {
        logout: function() {
            session.clear();
            $location.path("/login");
        }
    }
}]);
