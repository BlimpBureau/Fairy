'use strict';

describe('Directive: newPriceItem', function () {
  var element, scope;

  // load the directive's module
  beforeEach(module('fairyApp'));

  beforeEach(module('views/newpriceitem.html'));

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();

    scope.partners = [{
      fullname: 'Lucas Wiener'
    },
    {
      fullname: 'Nadan Gergeo'
    }];

    element = angular.element('<new-price-item></new-price-item>');
    $compile(element)(scope);
    scope.$digest();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    
  }));
});
