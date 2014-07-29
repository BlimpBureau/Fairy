/* global bookie */

"use strict";

angular.module("presentation.dateFilter", [])

.filter("dateFilter", function() {
    return function(date) {
        return bookie.dateToString(bookie.parseDate(date));
    };
})

;
