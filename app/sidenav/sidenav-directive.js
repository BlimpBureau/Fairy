"use strict";

angular.module("sidenav", [])

.directive("sidenav", function() {
    return {
        scope: true,
        restrict: "E",
        templateUrl: "sidenav/sidenav.html",
        link: function(scope, element, attr, controller) {
            scope.items = [
                item("#", "Lucas Wiener", "head"),
                item("#", "Dashboard", "bar-graph-2"),
                item("#", "Ledger", "book"),
                item("#", "Settings", "cog"),
                item("#/logout", "Sign out", "umbrella")
            ];
        }
    };
});

function item(href, text, icon) {
    return {
        href: href,
        text: text,
        icon: icon
    }
}
