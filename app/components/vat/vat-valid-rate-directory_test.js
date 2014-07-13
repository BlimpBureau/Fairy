/* global describe, it, expect, beforeEach, module, inject */

"use strict";

describe("vat.validRate", function() {
    var form, scope;

    beforeEach(module("vat.validRate"));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope;
        scope.model = {
            vatRate: undefined
        };

        var element = angular.element("<form name=\"form\"><input name=\"vatRate\" type=\"text\" ng-model=\"model.vatRate\" valid-vat-rate></form>");

        $compile(element)(scope);
        scope.$digest();
        form = scope.form;
    }));

    function valid(value, modelValue) {
        if(!modelValue) {
            modelValue = parseFloat(value);
        }

        form.vatRate.$setViewValue(value);
        expect(scope.model.vatRate).toBe(parseFloat(modelValue));
        expect(form.vatRate.$valid).toBe(true);
    }

    function invalid(value) {
        form.vatRate.$setViewValue(value);
        expect(scope.model.vatRate).toBe(undefined);
        expect(form.vatRate.$valid).toBe(false);
    }

    it("should only accept ranges between 0 and 1", function() {
        invalid("a");
        invalid(undefined);
        invalid(false);
        invalid("0");
        invalid("1");
        invalid(".");

        valid("0.1");
        valid("0.9");
        valid("0.99999");
        valid("0.515121");
    });

    it("should accept and transfrom commas", function() {
        invalid("0,");
        invalid(",");
        invalid(",1");

        valid("0,31", 0.31);
        valid("0,1412", 0.1412);
        valid("0,999", 0.999);
    });
});
