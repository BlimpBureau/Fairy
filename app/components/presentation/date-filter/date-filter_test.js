/* global bookie, describe, it, expect, beforeEach, module, inject */

"use strict";

describe("presentation.dateFilter", function() {
    var dateFilter;

    beforeEach(module("presentation.dateFilter"));

    beforeEach(inject(function($filter) {
        dateFilter = $filter("dateFilter");
    }));

    describe("dateFilter", function() {
        it("should reformat a date to readable string", function() {
            expect(dateFilter(bookie.parseDate("2012-03-01"))).toEqual("2012-03-01");
            expect(dateFilter(bookie.parseDate("2014-01-01"))).toEqual("2014-01-01");
        });

        it("should also accept already formatted date strings", function() {
            expect(dateFilter("2012-03-01")).toEqual("2012-03-01");
            expect(dateFilter("2014-01-01")).toEqual("2014-01-01");
        });
    });
});
