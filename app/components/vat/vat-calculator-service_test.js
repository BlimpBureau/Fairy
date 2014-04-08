/* global describe, it, expect, beforeEach, module, inject */

'use strict';

describe('vat.calculator', function() {
  var vatCalculator;

  beforeEach(function() {
    module('vat.calculator');

    inject(function(_vatCalculator_) {
      vatCalculator = _vatCalculator_;
    });
  });

  describe('vatOfPrice', function() {
    it('should return the correct vat by price exclusive vat', function() {
      expect(vatCalculator.vatOfPrice(100, 0.25, false)).toEqual(25);
    });

    it('should default priceIncludingVat paramater to false', function() {
      expect(vatCalculator.vatOfPrice(100, 0.25)).toEqual(25);
    });

    it('should work with float vat values', function() {
      expect(vatCalculator.vatOfPrice(1, 0.1)).toEqual(0.1);
    });

    it('should return the correct vat by price inclusive vat', function() {
      expect(vatCalculator.vatOfPrice(100, 0.25, true)).toEqual(20);
    });
  });

  describe('vatRateOfPrice', function() {
    it('should return the correct vat rate by price exlcusive vat', function() {
      expect(vatCalculator.vatRateOfPrice(100, 25, false)).toEqual(0.25);
    });

    it('should default priceIncludingVat parameter to false', function() {
      expect(vatCalculator.vatRateOfPrice(100, 10)).toEqual(0.1);
    });

    it('should return the correct vat rate by price inclusive vat', function() {
      expect(vatCalculator.vatRateOfPrice(100, 20, true)).toEqual(0.25);
    });
  });

  describe('priceOfVat', function() {
    it('should return the correct price by price exclusive vat', function() {
      expect(vatCalculator.priceOfVat(25, 0.25, false)).toEqual(100);
    });

    it('should default priceIncludingVat parameter to false', function() {
      expect(vatCalculator.priceOfVat(10, 0.1)).toEqual(100);
    });

    it('should return the correct price by price inclusive vat', function() {
      expect(vatCalculator.priceOfVat(20, 0.25, true)).toEqual(100);
      expect(vatCalculator.priceOfVat(10, 0.1, true)).toEqual(110);
    });
  });
});
