"use strict";

angular.module("logout", [
    "misc.session",
    "ui.router"
])

.controller("LogoutController", ["$state", "session", function($state, session) {
    session.clear();
    $state.go("login");
}]);
