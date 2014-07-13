"use strict";

angular.module("resources.incomes", [])

.factory("incomes", function() {
    var incomes = [{
        "date": "2014-01-23",
        "amount": 23000,
        "amountIncludesVat": true,
        "vatRate": 0.25,
        "vat": 4600,
        "owners": {
            "Lucas Wiener": 1,
            "Nadan Gergeo": 0
        },
        "description": "MBP 2014 :("
    }, {
        "date": "2014-02-01",
        "amount": 100,
        "amountIncludesVat": true,
        "vatRate": 0.25,
        "vat": 20,
        "owners": {
            "Lucas Wiener": 0.13,
            "Nadan Gergeo": 0.87
        },
        "description": "Notebook"
    }, {
        "date": "2013-03-14",
        "amount": 83,
        "amountIncludesVat": true,
        "vatRate": 0.25,
        "vat": 16.599999999999994,
        "owners": {
            "Lucas Wiener": 0.5,
            "Nadan Gergeo": 0.5
        },
        "description": "Pie"
    }];

    return {
        add: function(income) {
            incomes.push(income);
            return 1;
        },
        get: function() {
            return incomes;
        }
    };
});
