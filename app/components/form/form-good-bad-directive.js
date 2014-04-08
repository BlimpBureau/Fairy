'use strict';

angular.module('form.goodBad', [])

.directive('goodBadForm', function() {
  return {
    scope: true,
    restrict: 'A',
    require: '^form',
    link: function(scope, element, attrs, form) {
      scope.isBad = function(name) {
        return form[name].$dirty && form[name].$invalid;
      };

      scope.isGood = function(name) {
        return form[name].$dirty && form[name].$valid;
      };
    }
  };
});
