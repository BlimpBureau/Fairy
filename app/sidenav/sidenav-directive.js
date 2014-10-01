"use strict";

angular.module("sidenav", [
    "sidenav.handler"
])

.directive("sidenav", ["sidenavHandler", function(sidenavHandler) {
    return {
        scope: true,
        restrict: "E",
        templateUrl: "sidenav/sidenav.html",
        link: function(scope, element, attr, controller) {
            //TODO: Decide how to handle this.
            // scope.$watch(function() {
            //     return sidenavHandler.getItems();
            // }, function(items) {
            //     scope.items = items;
            // });

            sidenavHandler.append("#", "", "head", true, "user");
            sidenavHandler.append("#", "Dashboard", "bar-graph-2");
            sidenavHandler.append("#", "Ledger", "book");
            sidenavHandler.append("#", "Settings", "cog");
            sidenavHandler.append("#/logout", "Sign out", "umbrella");

            scope.items = sidenavHandler.getItems();

            scope.$on("user:changed", function(event, user) {
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
