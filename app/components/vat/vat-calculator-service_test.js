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

    it('should work with float price values', function() {
      expect(vatCalculator.vatOfPrice(1, 0.1)).toEqual(0.1);
    });

    it('should return the correct vat by price inclusive vat', function() {
      expect(vatCalculator.vatOfPrice(100, 0.25, true)).toEqual(20);
    });
  });
});
