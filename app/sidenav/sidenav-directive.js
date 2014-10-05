"use strict";

angular.module("sidenav", [
    "sidenav.handler",
    "resources.user"
])

.directive("sidenav", ["sidenavHandler", "userService", function(sidenavHandler, userService) {
    return {
        scope: true,
        restrict: "E",
        templateUrl: "sidenav/sidenav.html",
        link: function(scope) {
            //TODO: Decide how to handle this.
            // scope.$watch(function() {
            //     return sidenavHandler.getItems();
            // }, function(items) {
            //     scope.items = items;
            // });

            sidenavHandler.append("user", "user", "head", true, "user");
            sidenavHandler.append("dashboard", "Dashboard", "bar-graph-2");
            sidenavHandler.append("ledger", "Ledger", "book");
            sidenavHandler.append("settings", "Settings", "cog");
            sidenavHandler.append("logout", "Sign out", "umbrella");

            scope.items = sidenavHandler.getItems();

            userService.on("changed", function(user) {
                var userChanges = {};

                if(user) {
                    userChanges.text = user.firstName + " " + user.lastName;
                    userChanges.show = true;
                } else {
                    userChanges.text = "";
                    userChanges.show = false;
                }

                sidenavHandler.changeItemByAlias("user", userChanges);
                scope.items = sidenavHandler.getItems();
            });
        }
    };
}]);
