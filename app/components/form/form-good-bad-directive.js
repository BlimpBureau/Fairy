'use strict';

angular.module('form.goodBad', [])

.directive('goodBadForm', function() {
  return {
    scope: true,
    restrict: 'A',
    require: '^form',
    link: function(scope, element, attrs, form) {
      scope.isBad = function(name) {
        var e = form[name];
        return e && e.$dirty && e.$invalid;
      };

      scope.isGood = function(name) {
        var e = form[name];
        return e && e.$dirty && e.$valid;
      };
    }
  };
});
