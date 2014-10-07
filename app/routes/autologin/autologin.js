"use strict";

angular.module("autologin", [
    "ui.router",
    "misc.session",
    "misc.login"
])

.controller("AutologinController", ["$rootScope", "$state", "$stateParams", "loginService", "session", function($rootScope, $state, $stateParams, loginService, session) {
    $rootScope.sidenav = false; //TODO: Should be fixed by state change event, but its not fired?

    var goTo = $stateParams.goTo;

    if(goTo === "autologin" || goTo === "logout" || goTo === "login") {
        //This doesnt make any sense.
        goTo = false;
    }

    goTo = goTo || "dashboard";

    loginService.loginByToken(session.userId, session.token).then(function() {
        console.log("Logged in.");
        $state.go(goTo);
    }, function(error) {
        console.error("Failed autologin", error);
        $state.go("logout");
    });
}])

;
