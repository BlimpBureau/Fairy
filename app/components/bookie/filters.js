"use strict";

angular.module("bookie.filters", [])

.filter("bookieAccountsFilter", function() {
    return function(book) {
        return book.getAccounts();
    };
})

.filter("bookieVerificationsFilter", function() {
    return function(book) {
        return book.getVerifications();
    };
})

.filter("bookieTransactionFilter", function() {
    return function(verification, account, type) {
        if(!account || !account.number) {
            throw new Error("Invalid account object.");
        }

        if(type !== "credit" && type !== "debit") {
            throw new Error("Invalid type. Can be credit or debit.");
        }

        var accountTransactions = verification[type + "s"];

        var amount = 0;

        _.forEach(accountTransactions, function(transaction) {
            if(transaction.account.number === account.number) {
                amount = transaction.amount;
                return false;
            }
        });

        return amount;
    };
})

;
