'use strict';

angular.module('resources.expenses', [])

.factory('expenses', function() {
  var expenses = [{
    "date": "2014-01-23",
    "price": 23000,
    "priceIncludesVat": true,
    "vatRate": 0.25,
    "vat": 4600,
    "owners": [
      "Lucas Wiener"
    ],
    "payer": "Backslashforward HB",
    "description": "MBP 2014 :("
  }, {
    "date": "2014-02-01",
    "price": 100,
    "priceIncludesVat": true,
    "vatRate": 0.25,
    "vat": 20,
    "owners": [
      "Lucas Wiener",
      "Nadan Gergeo"
    ],
    "payer": "Nadan Gergeo",
    "description": "Notebook"
  }, {
    "date": "2013-03-14",
    "price": 83,
    "priceIncludesVat": true,
    "vatRate": 0.25,
    "vat": 16.599999999999994,
    "owners": [
      "Lucas Wiener",
      "Nadan Gergeo"
    ],
    "payer": "Lucas Wiener",
    "description": "Pie"
  }];




  return {
    add:  function(expense) {
      expenses.push(expense);
      return 1;
    },
    get: function() {
      return expenses;
    }
  };
});
