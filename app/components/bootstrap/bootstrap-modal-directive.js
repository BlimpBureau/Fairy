'use strict';

angular.module('bootstrap.modal', [])

.directive('bootstrapModal', function() {
  return {
    scope: true,
    link: function(scope, element, attr) {
      var id = attr.id;

      scope.close = function() {
        $('#' + id).modal('hide');
      };
    }
  };
});
