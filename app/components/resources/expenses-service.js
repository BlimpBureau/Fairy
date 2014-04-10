'use strict';

angular.module('resources.expenses', [])

.factory('expenses', function() {
  var expenses = [];

  return {
    add: function(expense) {
      expenses.push(expense);
    }
  };
});
