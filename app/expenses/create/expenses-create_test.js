/* global describe, it, expect, beforeEach, module, inject */

'use strict';

describe('expenses.create', function() {
  beforeEach(module('expenses.create'));

  describe('CreateExpenseController', function() {
    var controller, scope;

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('CreateExpenseController', { $scope: scope });
    }));

    it('should init the expense object and other objects to default values', function() {
      expect(scope.expense.description).toBe(undefined);
      expect(scope.expense.price).toBe(undefined);
      expect(scope.expense.priceIncludesVat).toEqual(false);
      expect(scope.expense.vatRate).toBe(undefined);
      expect(scope.expense.vat).toBe(undefined);
      expect(scope.expense.owners).toEqual(undefined);

      expect(scope.changedBy).toEqual({ price: 'controller', vatRate: 'controller', vat: 'controller' });
    });

    it('should autofill vat correctly', function() {
      scope.expense.price = 100;
      scope.$apply();

      expect(scope.expense.price).toEqual(100);
      expect(scope.expense.vatRate).toEqual(undefined);
      expect(scope.expense.vat).toEqual(undefined);

      scope.expense.vatRate = 0.25;
      scope.$apply();

      expect(scope.expense.price).toEqual(100);
      expect(scope.expense.vatRate).toEqual(0.25);
      expect(scope.expense.vat).toEqual(25);

      scope.expense.vat = 0;
      scope.expense.price = 0;
      scope.$apply();

      expect(scope.expense.price).toEqual(0);
      expect(scope.expense.vatRate).toEqual(0.25);
      expect(scope.expense.vat).toEqual(0);

      scope.expense.price = 200;
      scope.$apply();

      expect(scope.expense.price).toEqual(200);
      expect(scope.expense.vatRate).toEqual(0.25);
      expect(scope.expense.vat).toEqual(50);
    });

    it('should autofill vatRate correctly', function() {
      scope.expense.price = 100;
      scope.$apply();

      expect(scope.expense.price).toEqual(100);
      expect(scope.expense.vatRate).toEqual(undefined);
      expect(scope.expense.vat).toEqual(undefined);

      scope.expense.vat = 25;
      scope.$apply();

      expect(scope.expense.price).toEqual(100);
      expect(scope.expense.vatRate).toEqual(0.25);
      expect(scope.expense.vat).toEqual(25);

      scope.expense.vatRate = 0;
      scope.expense.price = 0;
      scope.$apply();

      expect(scope.expense.price).toEqual(0);
      expect(scope.expense.vatRate).toEqual(0);
      expect(scope.expense.vat).toEqual(25);

      scope.expense.price = 200;
      scope.$apply();

      expect(scope.expense.price).toEqual(200);
      expect(scope.expense.vatRate).toEqual(0.125);
      expect(scope.expense.vat).toEqual(25);
    });

    it('should autofill price correctly', function() {
      scope.expense.vatRate = 0.25;
      scope.$apply();

      expect(scope.expense.price).toEqual(undefined);
      expect(scope.expense.vatRate).toEqual(0.25);
      expect(scope.expense.vat).toEqual(undefined);

      scope.expense.vat = 25;
      scope.$apply();

      expect(scope.expense.price).toEqual(100);
      expect(scope.expense.vatRate).toEqual(0.25);
      expect(scope.expense.vat).toEqual(25);

      scope.expense.vatRate = 0;
      scope.expense.price = 0;
      scope.$apply();

      expect(scope.expense.price).toEqual(0);
      expect(scope.expense.vatRate).toEqual(0);
      expect(scope.expense.vat).toEqual(25);

      scope.expense.vatRate = 0.125;
      scope.$apply();

      expect(scope.expense.price).toEqual(200);
      expect(scope.expense.vatRate).toEqual(0.125);
      expect(scope.expense.vat).toEqual(25);
    });

    describe('user editing', function() {
      it('should not autofill if field was user edited if not empty', function() {
        scope.changed('vat');
        scope.expense.price = 100;
        scope.expense.vatRate = 0.25;
        scope.$apply();

        expect(scope.expense.price).toEqual(100);
        expect(scope.expense.vatRate).toEqual(0.25);
        expect(scope.expense.vat).toEqual(25);

        scope.changed('vat');
        scope.expense.price = 200;
        expect(scope.expense.price).toEqual(200);
        expect(scope.expense.vatRate).toEqual(0.25);
        expect(scope.expense.vat).toEqual(25);
      });

      it('should keep updating values that has been autofilled', function() {
        scope.changed('vatRate');
        scope.expense.price = 100;
        scope.expense.vatRate = 0.25;
        scope.$apply();

        expect(scope.expense.price).toEqual(100);
        expect(scope.expense.vatRate).toEqual(0.25);
        expect(scope.expense.vat).toEqual(25);

        scope.expense.price = 200;
        scope.$apply();

        expect(scope.expense.price).toEqual(200);
        expect(scope.expense.vatRate).toEqual(0.25);
        expect(scope.expense.vat).toEqual(50);

        scope.changed('vat');
        scope.expense.vat = 25;
        scope.$apply();

        expect(scope.expense.price).toEqual(100);
        expect(scope.expense.vatRate).toEqual(0.25);
        expect(scope.expense.vat).toEqual(25);

        scope.expense.vatRate = 0;
        scope.expense.price = 200;
        scope.$apply();

        expect(scope.expense.price).toEqual(200);
        expect(scope.expense.vatRate).toEqual(0.125);
        expect(scope.expense.vat).toEqual(25);

        scope.expense.price = 100;
        scope.$apply();

        expect(scope.expense.price).toEqual(100);
        expect(scope.expense.vatRate).toEqual(0.25);
        expect(scope.expense.vat).toEqual(25);
      });

      describe('priceInclusiveVat checkbox', function() {
        it('should only update a controller-changed or user-empty model value if changed', function() {
          scope.expense.price = 100;
          scope.expense.vatRate = 0.25;
          scope.expense.vat = 25;
          scope.changed('vatRate');
          scope.changed('vat');
          scope.expense.priceIncludesVat = true;
          scope.$apply();

          expect(scope.expense.price).toEqual(125);
          expect(scope.expense.vatRate).toEqual(0.25);
          expect(scope.expense.vat).toEqual(25);

          scope.expense.vat = 0;
          scope.expense.price = 100;
          scope.changed('price');
          scope.expense.priceIncludesVat = false;
          scope.$apply();

          expect(scope.expense.price).toEqual(100);
          expect(scope.expense.vatRate).toEqual(0.25);
          expect(scope.expense.vat).toEqual(25);

          scope.changed('vat');
          scope.changed('price');
          scope.changed('vatRate');
          scope.expense.priceIncludesVat = true;
          scope.$apply();

          expect(scope.expense.price).toEqual(100);
          expect(scope.expense.vatRate).toEqual(0.25);
          expect(scope.expense.vat).toEqual(25);
        });
      });
    });
  });
});
