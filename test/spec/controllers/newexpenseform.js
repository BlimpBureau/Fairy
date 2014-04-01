'use strict';

describe('Controller: NewexpenseformctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('fairyApp'));

  var NewexpenseformctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewexpenseformctrlCtrl = $controller('NewexpenseformctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
