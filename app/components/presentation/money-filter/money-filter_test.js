/* global describe, it, expect, beforeEach, module, inject */

"use strict";

describe("presentation.moneyFilter", function() {
    var moneyFilter;

    beforeEach(module("presentation.moneyFilter"));

    beforeEach(inject(function($filter) {
        moneyFilter = $filter("moneyFilter");
    }));

    describe("moneyFilter", function() {
        it("should return the value given", function() {
            expect(moneyFilter(123)).toEqual("123");
            expect(moneyFilter(91)).toEqual("91");
            expect(moneyFilter(0)).toEqual("0");
        });

        it("should handle decimals", function() {
            expect(moneyFilter(0.01)).toEqual("0.01");
            expect(moneyFilter(13.01)).toEqual("13.01");
            expect(moneyFilter(412.94)).toEqual("412.94");
        });

        it("should be able to parse numbers", function() {
            expect(moneyFilter("123")).toEqual("123");
            expect(moneyFilter("123.41")).toEqual("123.41");
            expect(moneyFilter("0.12")).toEqual("0.12");
        });

        it("should round numbers", function() {
            expect(moneyFilter(0.0012345)).toEqual("0");
            expect(moneyFilter(0.0454445)).toEqual("0.05");
            expect(moneyFilter(131.999)).toEqual("132");
        });

        it("should conform to show zero parameter", function() {
            expect(moneyFilter(0, false)).toEqual("");
            expect(moneyFilter(0.001, false)).toEqual("");
            expect(moneyFilter(0.009, false)).toEqual("0.01");
        });

        it("should conform to decimals parameter", function() {
            expect(moneyFilter(0.0012345, null, 4)).toEqual("0.0012");
            expect(moneyFilter(0.0454445, null, 0)).toEqual("0");
            expect(moneyFilter(131.999, null, 100)).toEqual("131.999");
        });

        it("should format the non decimal part of the number", function() {
            expect(moneyFilter(412414.123)).toEqual("412 414.12");
            expect(moneyFilter(412414)).toEqual("412 414");
            expect(moneyFilter(3133.23)).toEqual("3 133.23");
            expect(moneyFilter("000000.002", false)).toEqual("");
            expect(moneyFilter(3132, false)).toEqual("3 132");
            expect(moneyFilter(31211.4412, true, 0)).toEqual("31 211");
            expect(moneyFilter(11290301)).toEqual("11 290 301");
        });
    });
});
